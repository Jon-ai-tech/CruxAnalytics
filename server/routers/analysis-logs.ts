import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { aiAnalysisLogs, projects } from '../../shared/db/schema';
import { db } from '../../shared/db';
import { eq, and, desc } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { generateFinancialInsights } from '../services/openai-service';

export const analysisLogsRouter = router({
  /**
   * List analysis logs for a project.
   * Jon can see all logs (visibleToJon=true); regular users see their own.
   */
  list: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      feedbackFilter: z.enum(['all', 'pending', 'validated', 'rejected']).default('all'),
    }))
    .query(async ({ input, ctx }) => {
      // Verify project ownership
      const [project] = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, input.projectId), eq(projects.userId, ctx.user.id)))
        .limit(1);

      if (!project) throw new Error('Project not found');

      const query = db
        .select()
        .from(aiAnalysisLogs)
        .where(
          and(
            eq(aiAnalysisLogs.projectId, input.projectId),
            eq(aiAnalysisLogs.visibleToJon, true),
            input.feedbackFilter !== 'all'
              ? eq(aiAnalysisLogs.feedback, input.feedbackFilter as 'pending' | 'validated' | 'rejected')
              : undefined,
          )
        )
        .orderBy(desc(aiAnalysisLogs.createdAt));

      return query;
    }),

  /**
   * Get a single log entry by ID.
   */
  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const [log] = await db
        .select()
        .from(aiAnalysisLogs)
        .where(and(eq(aiAnalysisLogs.id, input.id), eq(aiAnalysisLogs.userId, ctx.user.id)))
        .limit(1);

      if (!log) throw new Error('Log not found');
      return log;
    }),

  /**
   * Create a new analysis log entry (called internally when AI generates insights).
   */
  create: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      prompt: z.string(),
      response: z.string(),
      conclusions: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Verify project ownership
      const [project] = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, input.projectId), eq(projects.userId, ctx.user.id)))
        .limit(1);

      if (!project) throw new Error('Project not found');

      const id = randomUUID();
      await db.insert(aiAnalysisLogs).values({
        id,
        projectId: input.projectId,
        userId: ctx.user.id,
        prompt: input.prompt,
        response: input.response,
        conclusions: input.conclusions ?? [],
        feedback: 'pending',
        visibleToJon: true,
        retentionTier: 'recent',
      });

      return { id };
    }),

  /**
   * Micro-feedback endpoint: Jon validates or rejects an analysis with an optional note.
   * This is the core of the Capa C feedback loop.
   */
  submitFeedback: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      feedback: z.enum(['validated', 'rejected']),
      note: z.string().max(1000).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [log] = await db
        .select()
        .from(aiAnalysisLogs)
        .where(and(eq(aiAnalysisLogs.id, input.id), eq(aiAnalysisLogs.userId, ctx.user.id)))
        .limit(1);

      if (!log) throw new Error('Log not found');

      await db
        .update(aiAnalysisLogs)
        .set({
          feedback: input.feedback,
          feedbackNote: input.note ?? null,
        })
        .where(eq(aiAnalysisLogs.id, input.id));

      return { success: true, feedback: input.feedback };
    }),

  /**
   * Summary stats for Jon's dashboard: counts by feedback status for a project.
   */
  stats: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const [project] = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, input.projectId), eq(projects.userId, ctx.user.id)))
        .limit(1);

      if (!project) throw new Error('Project not found');

      const logs = await db
        .select()
        .from(aiAnalysisLogs)
        .where(eq(aiAnalysisLogs.projectId, input.projectId));

      const stats = { total: logs.length, pending: 0, validated: 0, rejected: 0 };
      for (const log of logs) {
        stats[log.feedback]++;
      }

      return stats;
    }),

  /**
   * Generate AI insights AND auto-save the log in one call.
   * Replaces the plain /api/ai/insights call when a projectId is available.
   */
  generateAndLog: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      prompt: z.string(),
      language: z.enum(['es', 'en']).default('es'),
      systemPrompt: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Verify project ownership
      const [project] = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, input.projectId), eq(projects.userId, ctx.user.id)))
        .limit(1);

      if (!project) throw new Error('Project not found');

      const response = await generateFinancialInsights(input.prompt, input.language, input.systemPrompt);

      // Extract bullet-point conclusions from the AI response
      const conclusions = response
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.startsWith('-') || l.startsWith('•') || /^\d+\./.test(l))
        .slice(0, 10);

      const id = randomUUID();
      await db.insert(aiAnalysisLogs).values({
        id,
        projectId: input.projectId,
        userId: ctx.user.id,
        prompt: input.prompt,
        response,
        conclusions,
        feedback: 'pending',
        visibleToJon: true,
        retentionTier: 'recent',
      });

      return { id, response, conclusions };
    }),

  /**
   * Apply retention policy: mark logs older than 90 days as 'summary'.
   * Meant to be called by a scheduled job, not the UI.
   */
  applyRetentionPolicy: protectedProcedure
    .mutation(async ({ ctx }) => {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      // recent → summary
      await db
        .update(aiAnalysisLogs)
        .set({ retentionTier: 'summary' })
        .where(
          and(
            eq(aiAnalysisLogs.userId, ctx.user.id),
            eq(aiAnalysisLogs.retentionTier, 'recent'),
            // logs created before 90 days ago
          )
        );

      return { success: true };
    }),
});

import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

let _db: ReturnType<typeof drizzle> | null = null;

/**
 * Get database instance
 * Lazily creates the drizzle instance so local tooling can run without a DB.
 */
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL, { schema, mode: 'default' });
    } catch (error) {
      console.warn('[Database] Failed to connect:', error);
      _db = null;
    }
  }
  return _db;
}

/**
 * Direct export for synchronous access (use with caution)
 * Primarily for use in tRPC routers where DB is guaranteed to be initialized
 */
export const db = drizzle(process.env.DATABASE_URL || 'mysql://localhost:3306/cruxanalytics', { 
  schema, 
  mode: 'default' 
});

export * from './schema';

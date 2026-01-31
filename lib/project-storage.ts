/**
 * Compatibility shim for project-storage
 * This file forwards imports to the new API client layer
 * 
 * @deprecated Import from '@/lib/api/projects' instead
 */

export {
  getAllProjects,
  getProject,
  saveProject,
  updateProject,
  deleteProject,
  duplicateProject,
  getAllScenarios,
  saveScenarioSnapshot,
  deleteScenario,
  getBaseScenario,
  restoreScenarioAsBase,
  exportAllProjects,
  importProjects,
  searchProjects,
  filterProjectsByViability,
  saveDraft,
  loadDraft,
  clearDraft,
  hasDraft,
  getRecentProjects,
  createNewProject,
} from './api/projects';

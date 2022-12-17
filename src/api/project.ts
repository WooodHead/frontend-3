import { createQueryKeys } from '@lukemorales/query-key-factory'
import api from './api'

const projectQuery = {
  ...api.project,
  ...createQueryKeys('project', {
    all: {
      queryKey: null,
      queryFn: api.project.getProject,
    },
    workspace: {
      queryKey: null,
      queryFn: api.project.getWorkspaceInfo,
    },
    settings: {
      queryKey: null,
      queryFn: api.project.getProjectSettings,
    },
  }),
}

export default projectQuery

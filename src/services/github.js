import request from '../utils/github'
import syncQueue from '../utils/sync-queue'

export const repository = (repo) => request.get(['repos', repo])
export const repositoryRL = syncQueue(3000)(repository)

import request, { OAuth, auth } from '../utils/github'
import syncQueue from '../utils/sync-queue'
import { GITHUB_CLIENT_ID } from '../config/constants'

export const repository = (token) => (repo) => request.get(['repos', repo], { params: {
  access_token: token,
} })
export const repositoryRL = syncQueue(3000)(repository)

export const getAuthorizationURL = () => OAuth.getURL('authorize', {}, {
  client_id: GITHUB_CLIENT_ID,
  state: Math.random(),
})

export const authorize = (code, state) => auth.get(['auth', code, state])

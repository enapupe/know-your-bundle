import request from '../utils/github'

export const repository = (repo) => request.get(['repos', repo])

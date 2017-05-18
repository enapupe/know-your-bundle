import { NPM_BASE_URL, GITHUB_BASE_URL } from '../config/constants'
import getReponameFromModule from '../utils/get-reponame-from-module'

const getModuleURL = (module) => {
  const githubRepoURL = getReponameFromModule(module)
  if (githubRepoURL) {
    return `${GITHUB_BASE_URL}${githubRepoURL}`
  }
  return `${NPM_BASE_URL}${module.get('name')}`
}

export default getModuleURL

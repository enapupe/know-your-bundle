import { Map } from 'immutable'

const GITHUB_DOMAIN = 'github.com'

const getRepoFromGithubURL = (url) => url.replace('.git', '').split('github.com/')[1]

const getReponameFromModule = (module = new Map()) => {
  const type = module.getIn(['repository', 'type'])
  const url = module.getIn(['repository', 'url'])
  if (type === 'git' && url.includes(GITHUB_DOMAIN)) {
    return getRepoFromGithubURL(url)
  }
  return null
}

export default getReponameFromModule

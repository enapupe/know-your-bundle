import Fetch from '@cheesecakelabs/fetch'

import { GITHUB_API, GITHUB_OAUTH, GITHUB_PROXY_AUTH } from '../config/constants'

export default new Fetch(GITHUB_API, null, { removeTrailingSlash: true })

export const OAuth = new Fetch(GITHUB_OAUTH, null, { removeTrailingSlash: true })
export const auth = new Fetch(GITHUB_PROXY_AUTH, null, { removeTrailingSlash: true })

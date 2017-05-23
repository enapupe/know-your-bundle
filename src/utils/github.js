import Fetch from '@cheesecakelabs/fetch'

import { GITHUB_API } from '../config/constants'

export default new Fetch(GITHUB_API, null, { removeTrailingSlash: true })

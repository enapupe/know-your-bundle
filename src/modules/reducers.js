import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { error, loading } from '@cheesecakelabs/boilerplate/reducers'

import { module } from './module/reducers'
import { repository, auth } from './github/reducers'

const rootReducer = combineReducers({
  routing,
  module,
  repository,
  auth,
  error,
  loading,
})

export default rootReducer

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { error, loading } from '@cheesecakelabs/boilerplate/reducers'

import { module } from './module/reducers'
import { repository } from './github/reducers'

const rootReducer = combineReducers({
  routing,
  module,
  repository,
  error,
  loading,
})

export default rootReducer

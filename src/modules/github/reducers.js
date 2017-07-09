import { Map } from 'immutable'
import { normalize, schema } from 'normalizr'
import { createReducer } from '@cheesecakelabs/boilerplate/utils'

import { GET_REPOSITORY, AUTHORIZE } from './actions'

export const INITIAL_STATE = new Map()
export const repositorySchema = new schema.Entity('repository', {}, { idAttribute: 'full_name' })

export const repository = createReducer(INITIAL_STATE, {
  [GET_REPOSITORY.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload, repositorySchema).entities.repository),
})

export const auth = createReducer(new Map(), {
  [AUTHORIZE.FULFILLED]: (state, { payload }) =>
    state.set('access_token', payload.access_token),
})

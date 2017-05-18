import { Map } from 'immutable'
import { normalize, schema } from 'normalizr'
import { createReducer } from '@cheesecakelabs/boilerplate/utils'

import { GET_REPOSITORY } from './actions'

export const INITIAL_STATE = new Map()
export const repositorySchema = new schema.Entity('repository', {}, { idAttribute: 'full_name' })

export const repository = createReducer(INITIAL_STATE, {
  [GET_REPOSITORY.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload, repositorySchema).entities.repository),
})

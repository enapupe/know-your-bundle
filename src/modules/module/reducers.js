import { Map } from 'immutable'
import { normalize, schema } from 'normalizr'
import { createReducer } from '@cheesecakelabs/boilerplate/utils'

import { GET_MODULE } from './actions'

export const INITIAL_STATE = new Map()
export const moduleSchema = new schema.Entity('module', {}, { idAttribute: 'name' })

export const module = createReducer(INITIAL_STATE, {
  [GET_MODULE.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload, moduleSchema).entities.module),
})

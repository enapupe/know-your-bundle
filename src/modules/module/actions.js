import { defineAction } from '@cheesecakelabs/boilerplate/utils'

import * as moduleService from '../../services/module'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']
export const GET_MODULE = defineAction('GET_MODULE', REQUEST)

export const getModule = (moduleName) => (dispatch, getState) => dispatch({
  type: GET_MODULE,
  payload: getState().module.get(moduleName) || moduleService.get(moduleName),
})

import { defineAction } from '@cheesecakelabs/boilerplate/utils'

import * as githubService from '../../services/github'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']
export const GET_REPOSITORY = defineAction('GET_REPOSITORY', REQUEST)
export const AUTHORIZE = defineAction('AUTHORIZE', REQUEST)

export const getRepository = (reponame) => (dispatch, getState) => dispatch({
  type: GET_REPOSITORY,
  payload: getState().repository.get(reponame) ||
    githubService.repository(getState().auth.get('access_token'))(reponame),
})

export const authorize = (code, state) => (dispatch) => dispatch({
  type: AUTHORIZE,
  payload: githubService.authorize(code, state),
})

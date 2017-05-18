import { defineAction } from '@cheesecakelabs/boilerplate/utils'

import * as githubService from '../../services/github'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']
export const GET_REPOSITORY = defineAction('GET_REPOSITORY', REQUEST)

export const getRepository = (reponame) => (dispatch, getState) => dispatch({
  type: GET_REPOSITORY,
  payload: getState().repository.get(reponame) || githubService.repository(reponame),
})

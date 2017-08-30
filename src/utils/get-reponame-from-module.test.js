import { fromJS } from 'immutable'

import getReponameFromModule from './get-reponame-from-module'

test('getRepoNameFromModule', () => {
  expect(getReponameFromModule(fromJS({
    repository: {
      type: 'git',
      url: 'github.com/lalalele/lalala.git',
    },
  }))).toBe('lalalele/lalala')
})

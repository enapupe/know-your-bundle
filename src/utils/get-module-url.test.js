import { fromJS } from 'immutable'

import getModuleURL from './get-module-url'

test('getModuleURL with GitHub repository', () => {
  expect(getModuleURL(fromJS({
    repository: {
      type: 'git',
      url: 'github.com/lalalele/lalala.git',
    },
  }))).toBe('https://github.com/lalalele/lalala')
})

test('getModuleURL with non-GitHub repository', () => {
  expect(getModuleURL(fromJS({
    name: 'some-module',
    repository: {
      type: 'whatever',
      url: 'teste',
    },
  }))).toBe('https://www.npmjs.com/packages/some-module')
})

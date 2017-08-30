import profile from '../../tmp/reactapp.json'

import getUniqueModules from './get-unique-modules'

test('get unique modules from dleite', () => {
  const modules = getUniqueModules(profile)
  expect(modules.toJS()).toEqual([
    { name: 'whatwg-fetch', reasons: [] },
    { name: 'asap', reasons: ['promise'] },
    { name: 'fbjs', reasons: ['react-dom', 'react-dom', 'react'] },
    { name: 'prop-types', reasons: ['react-dom', 'react'] },
    { name: 'process', reasons: ['react-dom'] },
    { name: 'style-loader', reasons: [] },
    { name: 'react-dom', reasons: [] },
    { name: 'promise', reasons: [] },
    { name: 'css-loader', reasons: [] },
    { name: 'object-assign', reasons: ['react-dom', 'react'] },
    { name: 'react', reasons: ['react-dom'] },
  ])
})

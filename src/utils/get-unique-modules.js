import uniq from 'lodash.uniq'

const filterNot = [
  'global.js',
  'module.js',
  'amd-options.js',
  'polyfills.js',
  'index.css',
  'css-loader?importLoaders=1!.',
  'App.js',
  'App.css',
]

const stripStandardModules = (mod) => !filterNot.includes(mod)
const modName = (module) => module.name.split('/')[2]
const getUniqueModules = (profile) =>
  uniq(profile.modules.map(modName))
  .filter(Boolean)
  .filter(stripStandardModules)
  .sort()

export default getUniqueModules

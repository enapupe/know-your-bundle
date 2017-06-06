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

const isScoped = (modName) => modName.includes('@')
const stripStandardModules = (mod) => !filterNot.includes(mod)
const getModuleName = (module) => {
  if (isScoped(module.name)) {
    return module.name.split('/').splice(2, 2).join('/')
  }
  return module.name.split('/')[2]
}
const getUniqueModules = (profile) =>
  uniq(profile.modules.map(getModuleName))
  .filter(Boolean)
  .filter(stripStandardModules)
  .sort()

export default getUniqueModules

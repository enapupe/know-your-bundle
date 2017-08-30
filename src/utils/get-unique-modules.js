import { Map } from 'immutable'
import uniq from 'lodash.uniq'

const filterNot = [
  'global.js',
  'module.js',
  'amd-options.js',
  'polyfills.js',
  'index.css',
  'index.js',
  'css-loader?importLoaders=1!.',
  'App.js',
  'App.css',
  'logo.svg',
]

const isScoped = (modName) => modName.includes('@')
const stripStandardModules = (mod) => !filterNot.includes(mod)
const stripStandardModulesFromModule = (mod) => stripStandardModules(mod.name)
const getModuleName = (module) => {
  if (isScoped(module.name)) {
    return module.name.split('/').splice(2, 2).join('/')
  }
  return module.name.split('/')[2]
}

const self = (moduleName, topModule) => moduleName !== topModule

const getModuleNameFromReason = (module) => {
  if (isScoped(module.moduleName)) {
    return module.moduleName.split('/').splice(2, 2).join('/')
  }
  return module.moduleName.split('/')[2]
}

const getModuleMeta = (module) => {
  const meta = {}
  meta.name = getModuleName(module)
  if (meta.name && module.reasons) {
    meta.reasons = uniq(module.reasons.map(getModuleNameFromReason)
      .filter(Boolean)
      .filter(stripStandardModules))
      .filter(self.bind(null, meta.name))
  }
  return meta
}

const hasName = (module) => module.name

const getUniqueModules = (profile) =>
  profile.modules.map(getModuleMeta)
  .filter(hasName)
  .filter(stripStandardModulesFromModule)
  .reduce((prev, module) =>
    prev.mergeDeepIn([module.name], module),
    new Map(),
  )
  .toList()

export default getUniqueModules

import uniq from 'lodash.uniq'

const filterNot = ['global.js', 'module.js', 'amd-options.js']
const stripStandardModules = (mod) => !filterNot.includes(mod)
const modName = (module) => module.name.split('/')[2]
const getUniqueModules = (profile) => uniq(profile.modules.map(modName))
      .filter(Boolean)
      .filter(stripStandardModules)
      .sort()

export default getUniqueModules

import removeAvaImport from './src/remove-ava-import'
import removeTParameter from './src/remove-t-parameter'
import replaceTdotTruthy from './src/replace-t-dot-truthy'
import replaceTdotIs from './src/replace-t-dot-is'

const transform = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  removeAvaImport(j, root)

  // Transform each test
  removeTParameter(j, root)
  replaceTdotTruthy(j, root)
  replaceTdotIs(j, root)

  return root.toSource()
}

export default transform

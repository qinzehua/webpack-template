const LoaderUtils = require('loader-utils')
module.exports = function (source) {
  const { name } = LoaderUtils.getOptions(this)
  const url = LoaderUtils.interpolateName(this, `${name}.[ext]`, source)
  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  this.emitFile(url, json)

  return json
}

/* eslint-disable */
const JSZip = require('jszip')
const zip = new JSZip()
const { RawSource } = require('webpack-sources')

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // 异步钩子
    compiler.hooks.emit.tapAsync('QzhZipPlugin', (compilation, callback) => {
      // 创建目录
      const folder = zip.folder(this.options.filename)
      for (const filename in compilation.assets) {
        const source = compilation.assets[filename].source()
        // 创建文件
        folder.file(filename, source)
      }
      zip
        .generateAsync({
          type: 'nodebuffer'
        })
        .then(content => {
          const outputPath = '20210113.zip'
          compilation.assets[outputPath] = new RawSource(content)
          callback()
        })
    })
  }
}

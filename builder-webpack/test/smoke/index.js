const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')

process.chdir(path.join(__dirname, './template'))
rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.js')
  webpack(prodConfig, (error, stats) => {
    if (error) {
      console.log(error)
      process.exit(2)
    }

    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false
      })
    )
  })
})

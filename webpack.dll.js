const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    library: ['react', 'react-dom', 'lodash']
  },
  output: {
    filename: '[name]_[hash:8].dll.js',
    path: path.join(__dirname, 'build/library'),
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.join(__dirname, 'build/library/manifest_[name].json')
    })
  ]
}

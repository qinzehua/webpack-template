const WebpackMerge = require('webpack-merge').default
const webpack = require('webpack')
const path = require('path')

const baseConfig = require('./webpack.base.js')
const Project = process.cwd()

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: ['eslint-loader']
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: 'source-map'
}
module.exports = WebpackMerge(baseConfig, devConfig)

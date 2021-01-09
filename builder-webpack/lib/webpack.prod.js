const WebpackMerge = require('webpack-merge').default
const path = require('path')
const MiniCssExtractor = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Cssnano = require('cssnano')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const baseConfig = require('./webpack.base.js')
const Project = process.cwd()

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(Project, 'dist'),
    filename: 'js/a/b/c/[name]_[chunkhash:8].js',
    publicPath: './'
  },
  plugins: [
    new MiniCssExtractor({
      filename: 'cssFile/a/[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: Cssnano
    })
    // new webpack.DllReferencePlugin({
    //   manifest: require(path.join(
    //     Project,
    //     './build/library/manifest_library.json'
    //   ))
    // })
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 1,
          priority: -20
        }
      }
    },
    minimizer: [
      // 开启多进程并行压缩
      new TerserWebpackPlugin({
        parallel: true
      })
    ]
  },
  // 警告 webpack 的性能提示
  performance: {
    hints: 'warning',
    // 入口起点的最大体积
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积
    maxAssetSize: 30000000,
    // 只给出 js 文件的性能提示
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },

  devtool: 'source-map'
}

module.exports = WebpackMerge(baseConfig, prodConfig)

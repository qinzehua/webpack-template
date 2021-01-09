const WebpackMerge = require('webpack-merge')
const MiniCssExtractor = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Cssnano = require('cssnano')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const baseConfig = require('./webpack.base.js')

const ssrConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader'
      },
      {
        test: /\.less$/,
        use: 'ignore-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractor({
      filename: 'cssFile/a/[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: Cssnano
    }),
    new BundleAnalyzerPlugin()
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
    }
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
  stats: {
    preset: 'errors-only'
  },
  devtool: 'source-map'
}

module.exports = WebpackMerge(baseConfig, ssrConfig)

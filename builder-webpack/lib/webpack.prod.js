const glob = require('glob')
const WebpackMerge = require('webpack-merge').default
const path = require('path')
//提取css
const MiniCssExtractor = require('mini-css-extract-plugin')
//压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Cssnano = require('cssnano')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin')
const ZipPlugin = require('../../my-plugins/zip-plugin')

const baseConfig = require('./webpack.base.js')
const Project = process.cwd()
const PATH = {
  src: path.join(Project, './src')
}

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(Project, 'dist'),
    filename: 'js/a/b/c/[name]_[chunkhash:8].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
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
    new PurgeCssWebpackPlugin({
      paths: glob.sync(`${PATH.src}/**/*`, { nodir: true })
    }),
    // new HardSourceWebpackPlugin()
    // new webpack.DllReferencePlugin({
    //   manifest: require(path.join(
    //     Project,
    //     './build/library/manifest_library.json'
    //   ))
    // }),
    // new BundleAnalyzerPlugin()
    new ZipPlugin({
      filename: 'qzhZipFile'
    })
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
  devtool: 'source-map',
  resolve: {
    // 别名指定路径，缩短webpack查找时间
    alias: {
      react: path.resolve(
        Project,
        './node_modules/react/umd/react.production.min.js'
      ),
      'react-dom': path.resolve(
        Project,
        './node_modules/react-dom/umd/react-dom.production.min.js'
      )
    },
    extensions: ['.js'],
    mainFields: ['main']
  }
}

module.exports = WebpackMerge(baseConfig, prodConfig)

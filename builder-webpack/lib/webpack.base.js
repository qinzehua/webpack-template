const glob = require('glob')
const path = require('path')
const MiniCssExtractor = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')
const PostCssPreset = require('postcss-preset-env')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Project = process.cwd()
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(Project, './src/*/index.js'))

  Object.keys(entryFiles).forEach(index => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index.js$/)
    if (match) {
      const pageName = match[1]
      entry[pageName] = entryFile
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(Project, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: [pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
          }
        })
      )
    }
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(Project, 'src'),
        use: ['babel-loader?cacheDirectory=true']
      },
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractor.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 37.5,
              remPrecision: 8
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostCssPreset]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractor.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 37.5,
              remPrecision: 8
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostCssPreset]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 100,
              name: 'imageFile/[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fontsFile/a/[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.qzh$/,
        use: [
          {
            loader: path.join(__dirname, '../../my-loaders/row-loader.js'),
            options: {
              name: 'xxxxxxxxxx'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorPlugin(),
    new VueLoaderPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', stats => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') === -1
        ) {
          process.exit(1)
        }
      })
    },
    ...htmlWebpackPlugins
  ]
}

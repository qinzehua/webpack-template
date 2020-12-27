const path = require("path");
const miniCssExtractor = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlExternalsPlugin = require("html-webpack-externals-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const glob = require("glob");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index.js$/);
    if (match) {
      const pageName = match[1];
      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: [pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
          },
        })
      );
    }
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/a/b/c/[name]_[chunkhash:8].js",
    publicPath: "./",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractor.loader,
            options: {
              publicPath: "../../",
            },
          },
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 37.5,
              remPrecision: 8,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: miniCssExtractor.loader,
            options: {
              publicPath: "../../",
            },
          },
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 37.5,
              remPrecision: 8,
            },
          },
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 100,
              name: "imageFile/[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fontsFile/a/[name]_[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new miniCssExtractor({
      filename: "cssFile/a/[name]_[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins,
    // new BundleAnalyzerPlugin(),
    /* new HtmlExternalsPlugin({
      externals: [
        {
          module: "react",
          entry:
            "https://cdn.bootcdn.net/ajax/libs/react/17.0.1/umd/react.production.min.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry:
            "https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js",
          global: "ReactDOM",
        },
      ],
    }), */
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 1,
          priority: -20,
        },
      },
    },
  },
  devtool: "source-map",
};

const path = require("path");
module.exports = {
  entry: "./src/search/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
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
          "style-loader",
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
  optimization: {
    splitChunks: {
      chunks: "async", // 1
      minSize: 30000, // 1
      minChunks: 1, // 1
      maxAsyncRequests: 5, // 1
      maxInitialRequests: 3, // 1
      automaticNameDelimiter: "~", // 1
      name: false, // 1
      cacheGroups: {
        //1
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

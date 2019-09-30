const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
      app: path.resolve(__dirname, 'app'),
      loader123: path.resolve(__dirname, 'loader'),
    },

    output: {
      pathinfo: false,
      filename: '[name].js',
    },

    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          default: {
            reuseExistingChunk: false,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: false,
          },
        },
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('./app/index.html'),
        chunks: ['loader123'],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_module|dist)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [],
                plugins: [],
              },
            },
          ],
        },
      ],
    },
  }

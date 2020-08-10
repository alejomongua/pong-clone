const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    main: [
      './src/index.js'
    ]
  },
  mode: 'production',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader // inject CSS to page
        }, {
          loader: 'css-loader' // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run postcss actions
          options: {
            plugins: function () { // postcss plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer')
              ]
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Mi clon de Pong'
    })
  ]
}

module.exports = config

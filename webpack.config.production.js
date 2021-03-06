const path = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      threshold: 10240,
    }),
    new HtmlWebpackPlugin({
      title: 'Know your bundle!',
      template: './src/index.html.ejs',
    }),
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: false,
            minimize: true,
          },
        }],
      }),
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: true,
            importLoaders: 2,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        }, {
          loader: 'postcss-loader',
        }],
      }),
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          symbolId: '[name]_[hash]',
        },
      }, {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeTitle: true },
            { convertColors: { shorthex: false } },
            { convertPathData: false },
          ],
        },
      }],
    }],
  },
}

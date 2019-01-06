const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['two-dimensional-noise']),
    new HtmlWebpackPlugin({
      title: 'Chapter 5: Two dimensional noise',
      template: 'index.html'
    })
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'two-dimensional-noise')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

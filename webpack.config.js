const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './client/app.js',
  output: {
    path: path.resolve(__dirname, 'public/assets'), // string
    filename: 'bundle.js', // string
    publicPath: '/assets/', // string
  },
  module: {
    rules: [
      {
        test: /\.(jade|pug)$/,
        use: 'pug-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'client/index.pug',
      inject: false,
      title: 'json server'
    })
  ]
};

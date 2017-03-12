var path = require('path');
var webpack = require('webpack');
 
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: [APP_DIR + '/index.jsx'],
  output: { path: path.resolve(__dirname, 'public'), filename: 'bundle.js' },
  devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      hot: true
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.(jpg|ico)$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
};
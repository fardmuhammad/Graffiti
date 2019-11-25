const path= require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js',
        wall2: './src/wall2/index.js'
    },
    output: {
        path:  path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
          {
            test: /.jsx?$/,
            use: {
              loader: 'babel-loader',
              exclude: /node_modules/,
              options: {
                presets: ['es2015', 'react']
              }
            }
          }
        ]
      }
};
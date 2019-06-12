const { smart } = require('webpack-merge');
const { dirSync } = require('tmp');
const { NormalModuleReplacementPlugin, WatchIgnorePlugin } = require('webpack');

const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = smart(require('./webpack.server.config'), {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/server/start.ts',
  output: {
    path: dirSync({ prefix: 'real-estate-survey-web-' }).name,
    filename: 'server.js'
  },
  externals: {
    './main': '{}'
  },
  plugins: [
    new NormalModuleReplacementPlugin(/(.*)-ENVIRONMENT-(\.*)/, (resource) => {
      resource.request = resource.request.replace(/-ENVIRONMENT-/, '')
    }),
    new WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ]),
    new NodemonPlugin({
      nodeArgs: ['--inspect']
    })
  ]
});
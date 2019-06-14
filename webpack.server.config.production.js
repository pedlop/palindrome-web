const { join } = require('path');
const { smart } = require('webpack-merge');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = smart(require('./webpack.server.config'), {
  mode: 'development',
  devtool: false,
  entry: './src/server/start.ts', // Test build local change to start.ts, to production: server.ts
  output: {
    path: join(__dirname, 'dist'),
    library: 'app',
    libraryTarget: 'umd',
    filename: 'server.js',
  },
  plugins: [
    new NormalModuleReplacementPlugin(/\.\/main/, (resource) => {
      resource.request = resource.request.replace(/\.\/main/, '../../dist/server/main');
    }),
    new NormalModuleReplacementPlugin(/(.*)-ENVIRONMENT-(\.*)/, (resource) => {
      resource.request = resource.request.replace(/-ENVIRONMENT-/, '.production');
    })
  ]
});

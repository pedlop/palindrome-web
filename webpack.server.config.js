const { join } = require('path');
const { ContextReplacementPlugin } = require('webpack');

module.exports = {
  target: 'node',
  node: { __dirname: false },
  resolve: { extensions: ['.ts', '.js', '.json'] },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true },
      },
      {
        test: /\.(ts|js)$/,
        loader: 'regexp-replace-loader',
        query: {
          match: {
            pattern: '\\[(Mouse|Keyboard)Event\\]',
            flags: 'g'
          },
          replaceWith: '[]'
        }
      }
    ]
  },
  plugins: [
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      join(__dirname, 'src/client'), // location of your src
      {} // a map of your routes
    ),
    new ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      join(__dirname, 'src/server'),
      {}
    )
  ]
};

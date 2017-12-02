const path = require('path');
const config_main = {
  target: 'electron-main',
  entry: path.resolve(__dirname, 'src/main/index.ts'),
  output: {
    path    : path.resolve(__dirname, 'static'),
    filename: 'main.js'
  },
  node: {
    __dirname: false
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      main   : path.resolve(__dirname, 'src/main/'),
      common : path.resolve(__dirname, 'src/common/')
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};

const config_renderer = {
  target: 'electron-renderer',
  entry: path.resolve(__dirname, 'src/renderer/index.ts'),
  output: {
    path    : path.resolve(__dirname, 'static'),
    filename: 'renderer.js'
  },
  node: {
    __dirname: false
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      components : path.resolve(__dirname, 'src/renderer/components/'),
      core       : path.resolve(__dirname, 'src/renderer/core/'),
      states     : path.resolve(__dirname, 'src/renderer/states/'),
      ui         : path.resolve(__dirname, 'src/renderer/ui/'),
      common     : path.resolve(__dirname, 'src/common/'),
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};

module.exports = [
  config_main,
  config_renderer
];

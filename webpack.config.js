const path = require('path');
const config_main = {
  target: 'electron-main',
  entry: path.resolve(__dirname, 'src/main/index.js'),
  output: {
    path    : path.resolve(__dirname, 'static'),
    filename: 'main.js'
  },
  node: {
    __dirname: false
  },
  externals: [{ 'electron-store': 'require("electron-store")' }],
  resolve: {
    alias: {
      main   : path.resolve(__dirname, 'src/main/'),
      common : path.resolve(__dirname, 'src/common/')
    }
  }
};

const config_renderer = {
  target: 'electron-renderer',
  entry: path.resolve(__dirname, 'src/renderer/index.js'),
  output: {
    path    : path.resolve(__dirname, 'static'),
    filename: 'renderer.js'
  },
  node: {
    __dirname: false
  },
  externals: [{ 'electron-store': 'require("electron-store")' }],
  resolve: {
    alias: {
      components : path.resolve(__dirname, 'src/renderer/components/'),
      core       : path.resolve(__dirname, 'src/renderer/core/'),
      states     : path.resolve(__dirname, 'src/renderer/states/'),
      ui         : path.resolve(__dirname, 'src/renderer/ui/'),
      common     : path.resolve(__dirname, 'src/common/'),
    }
  }
};

module.exports = [
  config_main,
  config_renderer
];

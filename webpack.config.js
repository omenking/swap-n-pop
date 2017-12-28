const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');
const config_main = {
  target: 'electron-main',
  entry: path.resolve(__dirname, 'src/main/index.ts'),
  output: {
    path    : path.resolve(__dirname, 'app'),
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
    path    : path.resolve(__dirname, 'app'),
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

const config_devtools = {
  target: 'web',
  entry: {
    'background.js' : path.resolve(__dirname, 'src/devtools/background.ts'),
    'panel.js'      : path.resolve(__dirname, 'src/devtools/devtools_panel.ts'),
    'panel.css'     : path.resolve(__dirname, 'src/devtools/devtools_panel.sass'),
    'content.js'    : path.resolve(__dirname, 'src/devtools/content.ts')
  },
  output: {
    path    : path.resolve(__dirname, 'app', 'devtools'),
    filename: '[name]'
  },
  node: {
    __dirname: false
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      core                : path.resolve(__dirname, 'src/renderer/core/'),
      devtools_components : path.resolve(__dirname, 'src/devtools/components/'),
      devtools_common     : path.resolve(__dirname, 'src/devtools/common/'),
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: "css-loader", options: {url: false} },
            {
              loader: 'sass-loader',
              options: { indentedSyntax: true }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{ loader: "css-loader", options: {url: false} }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("panel.css"),
  ]
};

module.exports = [
  config_main,
  config_renderer,
  config_devtools
];

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path              = require('path')
const webpack           = require('webpack')

const ts = { test: /\.ts$/, loader: 'ts-loader' }

const scss = {
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
}
const css = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [{ loader: "css-loader", options: {url: false} }]
  })
}

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
      common                : path.resolve(__dirname, 'src/common/'),
      core                  : path.resolve(__dirname, 'src/renderer/core/'),
      'devtools/components' : path.resolve(__dirname, 'src/devtools/components/'),
      'devtools/common'     : path.resolve(__dirname, 'src/devtools/common/'),
    }
  },
  module : { rules: [ts,scss,css] },
  plugins: [ 
    new ExtractTextPlugin("panel.css"),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};

module.exports = [
  config_devtools
];

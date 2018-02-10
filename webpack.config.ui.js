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

const config_ui = {
  target: 'web',
  entry: {
    'app.css' : path.resolve(__dirname, 'src/renderer/ui/ui.sass')
  },
  output: {
    path    : path.resolve(__dirname, 'app', 'css'),
    filename: '[name]'
  },
  node: { __dirname: false },
  module : { rules: [scss,css] },
  plugins: [ 
    new ExtractTextPlugin("app.css"),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
}

module.exports = [
  config_ui
];

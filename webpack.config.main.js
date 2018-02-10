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


const config_main = {
  target: 'electron-main',
  entry: path.resolve(__dirname, 'src/main/index.ts'),
  output: {
    path    : path.resolve(__dirname, 'app'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      main   : path.resolve(__dirname, 'src/main/'),
      common : path.resolve(__dirname, 'src/common/')
    }
  },
  node: { __dirname: false },
  module: { rules: [ts] },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};
module.exports = [
  config_main
];


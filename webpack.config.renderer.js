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

const config_renderer = {
  target: 'electron-renderer',
  entry: {
    'renderer.js' : path.resolve(__dirname, 'src/renderer/index.ts'),
  },
  output: {
    path    : path.resolve(__dirname, 'app'),
    filename: '[name]'
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
  node: { __dirname: false },
  module : { rules: [ts] },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};

module.exports = [
  config_renderer
];

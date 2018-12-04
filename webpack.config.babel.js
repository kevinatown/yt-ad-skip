import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

const { NODE_ENV = 'development' } = process.env

const base = {
  context: __dirname,
  entry: {
    'content-script': './src/content-script.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './manifest.json', to: './manifest.json' },
      // { from: './icon', to: 'icons' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ]
}

const development = {
  ...base,
  mode: 'development',
  devtool: '#eval-module-source-map',
  module: {
    ...base.module
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
}

const production = {
  ...base,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  devtool: '#source-map',

  plugins: [
    ...base.plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
}

if (NODE_ENV === 'development') {
  module.exports = development
} else {
  module.exports = production
}

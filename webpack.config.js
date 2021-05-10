const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = () => process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd() || 'development',
  devServer: {
    port: process.env.PORT || 3000,
    hot: true,
    open: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'main.js',
  },
  module: {
    rules: [
      { test: /\.[tj]sx?$/, use: ['ts-loader'] },
      {
        test: /\.(s*)css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
                auto: /\.module\.\w+$/i,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
};

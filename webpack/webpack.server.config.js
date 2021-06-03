const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProd = () => process.env.NODE_ENV === 'production';

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: isProd() || 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, '../src/server/server.tsx'),
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.[tj]sx?$/, exclude: /node_modules/, use: ['ts-loader'] },
      {
        test: /\.scss$/,
        use: [
          'css-modules-typescript-loader?modules',
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
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: ['url-loader'],
      },
    ],
  },
};

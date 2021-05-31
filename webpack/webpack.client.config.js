const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = () => process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd() || 'development',
  optimization: {
    usedExports: true,
  },
  devServer: {
    port: process.env.PORT || 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: path.join(__dirname, '../src/index.ts'),
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'main.js',
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: [/node_modules/, path.join(__dirname, '../src/server/server.js')],
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      favicon: path.join(__dirname, '../public/favicon.ico'),
    }),
  ],
};

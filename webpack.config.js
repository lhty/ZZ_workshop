const webpackServerConfig = require('./webpack/webpack.server.config');
const webpackClientConfig = require('./webpack/webpack.client.config');

module.exports = [webpackClientConfig, webpackServerConfig];

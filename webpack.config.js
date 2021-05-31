const webpackServerConfig = require('./webpack.server.config');
const webpackClientConfig = require('./webpack.client.config');

module.exports = [webpackClientConfig, webpackServerConfig];

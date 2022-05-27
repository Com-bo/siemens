'use strict';

var path = require('path');

const RestProxy = require('sp-rest-proxy');

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  port: 8765,
  hostname: 'localhost',
};

var index = (api) => {
  api.logger.info('SharePoint Support On');
  const root = api.paths.cwd || process.cwd();
  const { port, hostname } = config;
  api.onDevCompileDone({
    fn: ({ isFirstCompile }) => {
      if (!isFirstCompile) return;
      const settings = {
        configPath: path.join(root, './private.json'),
        port,
        staticRoot: path.join(root, './dist'),
        hostname,
      };
      const restProxy = new RestProxy(settings);
      restProxy.serve();
      api.logger.info('SharePoint Support Server Running');
    },
  });
  api.chainWebpack({
    fn: (config) => {
      api.env !== 'production' &&
        config
          .plugin('HtmlWebpackPlugin')
          .use(HtmlWebpackPlugin, [
            {
              alwaysWriteToDisk: true,
              template: path.join(root, './src/pages/document.ejs'),
              filename: 'index.html',
            },
          ])
          .end()
          .plugin('HtmlWebpackHarddiskPlugin')
          .use(HtmlWebpackHarddiskPlugin)
          .end();
      return config;
    },
  });
};

module.exports = index;

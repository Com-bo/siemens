import { IApi } from '@umijs/types';
import { join } from 'path';
const RestProxy = require('sp-rest-proxy');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  port: 8003,
  hostname: '192.168.30.237',
};

export default (api: IApi) => {
  api.logger.info('SharePoint Support On');
  const root = api.paths.cwd || process.cwd();
  const { port, hostname } = config;

  api.onDevCompileDone({
    fn: ({ isFirstCompile }) => {
      if (!isFirstCompile) return;
      const settings = {
        configPath: join(root, './private.json'), // Location for SharePoint instance mapping and credentials
        port, // Local server port
        staticRoot: join(root, './dist'), // Root folder for static content
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
              template: join(root, './src/pages/document.ejs'),
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

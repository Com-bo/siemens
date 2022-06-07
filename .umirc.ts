import { defineConfig } from 'umi';
import { theme } from './src/app/config/theme';
export default defineConfig({
  hash: true,
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: './',
  favicon: 'favicon.ico',
  proxy: {
    '/api': {
      target: 'http://10.10.10.151:9001/',
      // pathRewrite: { '^/api': '' },
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/api',
      },
    }   
  },
  title: 'B&B System',
  locale: {
    default: 'en-US',
    antd: true,
    baseSeparator: '-',
    baseNavigator: true,
  },
  theme: theme,
  fastRefresh: {},
  extraBabelPlugins: ['babel-plugin-styled-components'],
});

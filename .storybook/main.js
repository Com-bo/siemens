const fs = require('fs');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../tsconfig.json',
    },
  },
  webpackFinal: async (config) => {
    let src = path.resolve(__dirname, '../src');
    let files = fs.readdirSync(src);
    files.forEach((name) => {
      let f = path.resolve(src, name);
      let stat = fs.statSync(f);
      if (stat.isDirectory()) {
        config.resolve.alias[`@/${name}`] = f;
      }
    });
    config.resolve.alias['@@'] = path.resolve(src, '.umi');
    config.module.rules.push({
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    });
    config.resolve.extensions.push('.less');

    return config;
  },
};

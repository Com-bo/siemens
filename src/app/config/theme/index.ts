import commonTheme from './common';

// 主题样式，会被注入到顶层样式provider中，可通过styleComponents读取，同时会被.umirc.ts读取应用到antd中
export const theme = {
  // ...commonTheme,
  '@primary-color': '#00807d',
  '@link-color': '#00807d',
  // '@border-color-base': '#00807d',
  '@border-radius-base': '5px',
  '@btn-border-radius-base': '5px',
};

export type Theme = typeof theme;

import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Button from './Example';

export default {
  title: 'Example/Button', // 控制组件标题，显示路由,a/b “/” 会在storybook左侧形成导航
  component: Button,
  // parameters: {     // 控制只显示doc tab,不显示canvas tab
  //   previewTabs: {
  //     canvas: {
  //       hidden: true,
  //     },
  //   },
  //   viewMode: 'docs',
  // }
} as Meta;

// 只控制peview渲染，必须是函数组件，对于无法提供完整依赖预览的组件可使用其他标签替代export const Default = () => <label/>;
export const Default = (args) => {
  return <Button {...args}></Button>;
};

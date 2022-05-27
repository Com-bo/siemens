import React from 'react';
import { Meta } from '@storybook/react';
import Helper from './index';
import { FullscreenExitOutlined } from '@ant-design/icons';

export default {
  title: 'MSO/Helper',
  component: Helper,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta;

export const Defalut = (args) => <Helper {...args} />;

Defalut.args = {
  render: <FullscreenExitOutlined />,
  title: 'hello',
  downloadUrl: 'https://www.medalsoft.com/zh-cn/',
};

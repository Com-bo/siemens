import React from 'react';
import { Meta } from '@storybook/react';
import TextIcon from './index';
// import 'antd/dist/antd.css';

export default {
  title: 'MSO/TextIcon',
  component: TextIcon,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta;

export const Defalut = (args) => <TextIcon {...args} />;
Defalut.args = {
  text: 'US',
};

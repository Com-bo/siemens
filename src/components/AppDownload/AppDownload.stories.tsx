import React from 'react';
import { Meta } from '@storybook/react';
import AppDownload from './index';

export default {
  title: 'MSO/AppDownload',
  component: AppDownload,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta;

export const Defalut = (args) => <AppDownload {...args} />;
Defalut.args = {
  source: [
    {
      url: 'https://umijs.org/api#link',
      agent: 'Android',
    },
    {
      url: 'https://umijs.org/api#link',
      agent: 'IOS',
    },
  ],
};

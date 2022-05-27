import React from 'react';
import { Meta } from '@storybook/react';
import NoticeIcon from './index';

export default {
  title: 'MSO/NoticeIcon',
  component: NoticeIcon,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta;

export const Defalut = (args) => <NoticeIcon {...args} />;

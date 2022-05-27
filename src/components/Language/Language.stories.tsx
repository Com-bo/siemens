import React from 'react';
import { Meta } from '@storybook/react';
import Language from './index';

export default {
  title: 'MSO/Language',
  component: Language,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta;

export const Defalut = (args) => (
  <div style={{ width: '100px' }}>
    <Language {...args} />
  </div>
);

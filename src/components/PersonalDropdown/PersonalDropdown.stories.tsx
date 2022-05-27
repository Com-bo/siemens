import React from 'react';
import { Meta } from '@storybook/react';
import PersonalDropdown from './index';

export default {
  title: 'MSO/PersonalDropdown',
  component: PersonalDropdown,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta;

export const Defalut = (args) => <PersonalDropdown {...args} />;

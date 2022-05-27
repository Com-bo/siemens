import React from 'react';
import { Meta } from '@storybook/react';
import Layout from './index';
import { Route, Router, history } from 'umi';
export default {
  title: 'MSO/Layout',
  component: Layout,
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
  <Router history={history}>
    <Route>
      <Layout {...args} />
    </Route>
  </Router>
);

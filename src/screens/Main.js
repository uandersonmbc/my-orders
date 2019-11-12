import React from 'react';
import { Layout } from 'antd';

import AppContent from './../components/AppContent';
import AppSideMenu from './../components/AppSideMenu';

import menu from './../configs/menu';

export default function Main(props) {

  return (
    <Layout>
      <AppSideMenu itens={menu.itens} prop={props} />
      <AppContent {...props} />
    </Layout>
  );
}
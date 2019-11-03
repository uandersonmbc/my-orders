import React from 'react';
import { Layout } from 'antd';

import AppContent from './../components/AppContent';
import AppSideMenu from './../components/AppSideMenu';

import teste from './../configs/menu';

export default function Main() {

  return (
    <Layout>
      <AppSideMenu itens={teste.itens} />
      <AppContent />
    </Layout>
  );
}
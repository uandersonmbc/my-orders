import React from 'react';
import { Layout } from 'antd';
import AppSideMenu from './../components/AppSideMenu';
import menu from './../configs/menu';

import { Redirect } from 'react-router-dom';

import { isAuthenticated } from './../services/auth';

const { Content } = Layout;

function Main(props) {
  const Verify = () => (isAuthenticated() ? '' : (<Redirect to='/login' />));
  return (
    <Layout>
      <Verify />
      <AppSideMenu itens={menu.itens} active={props.location.pathname} />
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
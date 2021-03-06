import React from 'react';
import { Layout } from 'antd';
import AppSideMenu from './../components/AppSideMenu';
import menu from './../configs/menu';

import { Redirect } from 'react-router-dom';

import { isAuthenticated, checkRole, logout, getRole } from './../services/auth';

const { Content } = Layout;

function Main(props) {
  const VerifyAuthentication = () => {
    VerifyRole();
    return (isAuthenticated() ? '' : (<Redirect to='/login' />))
  }
  const VerifyRole = async () => {
    const res = await checkRole();
    if (!res) {
      logout()
      props.history.push('/login');
    }
  }
  return (
    <Layout>
      <VerifyAuthentication />
      {(!(getRole() === 'customer')) ? (<AppSideMenu itens={menu.itens} active={props.location.pathname} />) : ''}
      <Layout style={{ marginLeft: (getRole() === 'customer') ? 0 : 200, minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
import React from 'react';
import { Layout } from 'antd';
import AppSideMenu from './../components/AppSideMenu';
import menu from './../configs/menu';
const { Content } = Layout;


export default function Main(props) {
  return (
    <Layout>
      <AppSideMenu itens={menu.itens} active={props.location.pathname} />
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
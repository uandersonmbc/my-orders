import React from 'react';

import { Route, Switch } from 'react-router-dom';

import privateRoutes from './../../routes/privateRoutes';

import { Layout } from 'antd';

const { Content, Footer } = Layout;

const AppContent = () => (
    <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Switch>
                {privateRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        </Content>
    </Layout>
);

export default AppContent;
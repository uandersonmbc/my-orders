import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';

const { Content } = Layout;



const AppContent = ({ role }) => {
    return (
        <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <Switch>
                    {role.map(route => (
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
}
export default AppContent;
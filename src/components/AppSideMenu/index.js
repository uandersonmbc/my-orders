import React from 'react';

import { HashRouter, Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

// import logo from './../../assets/myorder.png';
import logo from './../../assets/myorder.jpg';
const { Sider } = Layout;

const AppSideMenu = ({ itens }) => (
    <Sider
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
        }}
        className="scroll-none"
    >
        <div className="logo">
            <img width="100%" src={logo} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
            {itens.map((item, index) => (
                <Menu.Item key={index}>
                    <HashRouter basename='/'>
                        <Link to={item.url}>
                            <Icon type={item.icon} />
                            <span className="nav-text">{item.name}</span>
                        </Link>
                    </HashRouter>
                </Menu.Item>
            ))}
        </Menu>
    </Sider >
);


export default AppSideMenu;
import React from 'react';

import { Switch, Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

import { logout } from './../../services/auth';

import logo from './../../assets/myorder.jpg';

import { getRole } from './../../services/auth';

const { Sider } = Layout;

const AppSideMenu = ({ itens, active }) => {

    const deslogar = () => {
        logout();
    }

    return (

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
                <img width="100%" src={logo} alt="My Order" />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[active]}>
                {itens.map((item) => (
                    (item.can.indexOf(getRole()) > -1) ?
                        <Menu.Item key={item.url}>
                            <Switch basename='/'>
                                <Link to={item.url}>
                                    <Icon type={item.icon} />
                                    <span className="nav-text">{item.name}</span>
                                </Link>
                            </Switch>
                        </Menu.Item>
                        : ''))}
                <Menu.Item key='/logout'>
                    <Link to='#' onClick={deslogar}>
                        <Icon type='logout' />
                        <span className="nav-text">Sair</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider >
    );
}


export default AppSideMenu;
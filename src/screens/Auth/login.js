import React, { useState } from 'react';

import { Layout, Card, Alert } from 'antd';

import logo from './../../assets/myorder.png';

import Api from './../../services/api';

import { Redirect, Link } from 'react-router-dom';

import { login, isAuthenticated, roleUser, userName, getRole } from './../../services/auth';

import './style.css';

export default function Login(props) {

    const [singin, setSingin] = useState({
        visible: false,
        message: ''
    });
    console.log(props)
    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        try {
            const response = await Api.post('/login', obj);
            login(response.data.token);
            const user = await Api.get('/user');
            roleUser(user.data.role[0])
            userName(user.data.user.name)
            props.history.push('/' + getRole() + '/dashboard');
        } catch (error) {
            setSingin({
                visible: true,
                message: (error.response === undefined) ? '' : error.response.data.message
            });
        }
    }

    const Message = () => (
        <Alert
            message={singin.message}
            closable
            type="error"
            showIcon
            onClose={() => setSingin({ visible: false, message: '' })}
        />
    );

    const Verify = () => (isAuthenticated() ? (<Redirect to={`/${getRole()}/dashboard`} />) : '');

    return (
        <Layout className='total'>
            <Verify />
            <Card className='cardLogin'>
                <form onSubmit={onSubmitLogin}>
                    <div className='divImg'>
                        <img src={logo} className='img' alt="My Order" />
                    </div>
                    {singin.visible ? (<Message />) : ''}
                    <br />
                    {/*  */}
                    <div className='divInputs'>
                        <input required name='email' type='text' placeholder='E-mail/Usuário' className='input' />
                        <input required name='password' type='password' placeholder='Senha' className='input' />
                    </div>
                    {/*  */}
                    <div className='divButtons'>
                        <button type='submit' className='btn btn-primary'>Login</button>
                        <button className='btn btn-google'>Google</button>
                    </div>
                    {/*  */}
                    <div className='divLinks'>
                        <Link to='#' className='links'>Esqueceu a senha ?</Link>
                        <Link to='register' className='links'>Não é cadastrado?</Link>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}
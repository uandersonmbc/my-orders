import React, { useState } from 'react';

import { Layout, Card, Alert } from 'antd';

import logo from './../../assets/myorder.png';

import Api from './../../services/api';

import { Redirect } from 'react-router-dom';

import { login, isAuthenticated } from './../../services/auth';

import './style.css';

export default function Login({ props }) {

    const [singin, setSingin] = useState({
        visible: false,
        message: ''
    });

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        try {
            const response = await Api.post('/login', obj);
            login(response.data.token);
            props.history.push('/app');
        } catch (error) {
            setSingin({
                visible: true,
                message: (error.response == undefined) ? '' : error.response.data.message
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

    const Verify = () => (isAuthenticated() ? (<Redirect to='/administrator' />) : '');

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
                        <a href='#/register' className='links'>Esqueceu a senha ?</a>
                        <a href='#/' className='links'>Não é cadastrado?</a>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}
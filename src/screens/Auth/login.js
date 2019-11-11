import React, { useState } from 'react';

import { Layout, Card, Alert } from 'antd';

import logo from './../../assets/myorder.png';

import Api from './../../services/api';

import { Redirect } from 'react-router-dom';

import { login, isAuthenticated } from './../../services/auth';

import './style.css';

export default function Login({ props }) {

    const [singin, setSingin] = useState(false);

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        try {
            /* const response = await Api.post('/login', obj); */
            // login(response.data.data.token);
            login('apenas-testando');
            this.props.history.push('/app');
        } catch (error) {
            setSingin(true);
            console.log(error);
        }
    }

    const Message = () => (
        <Alert
            message="E-mail ou senha inválidos"
            closable
            type="error"
            showIcon
            onClose={() => setSingin(false)}
        />
    );

    const Verify = () => (isAuthenticated() ? (<Redirect to='/app' />) : '');

    return (
        <Layout className='total'>
            <Verify />
            <Card className='cardLogin'>
                <form onSubmit={onSubmitLogin}>
                    <div className='divImg'>
                        <img src={logo} className='img' alt="My Order" />
                    </div>
                    {singin ? (<Message />) : ''}
                    <br />
                    {/*  */}
                    <div className='divInputs'>
                        <input name='email' type='text' placeholder='E-mail/Usuário' className='input' />
                        <input name='password' type='password' placeholder='Senha' className='input' />
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
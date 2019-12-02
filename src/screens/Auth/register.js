import React, { useState } from 'react';

import { Layout, Card, Alert } from 'antd';

import logo from './../../assets/myorder.png';

import Api from './../../services/api';

import { Redirect } from 'react-router-dom';

import { login, isAuthenticated, roleUser, userName, getRole } from './../../services/auth';

import './style.css';

export default function Login({ props }) {

    const [singup, setSingup] = useState({
        visible: false,
        message: '',
        error: ''
    });

    const onSubmitRegister = async (e) => {
        e.preventDefault();
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value,
            name: e.target.name.value,
            username: e.target.username.value
        }

        try {
            console.log(obj)
            const response = await Api.post('/register', obj);
            login(response.data.token);
            const user = await Api.get('/user');
            roleUser(user.data.role[0])
            userName(user.data.user.name)
            props.history.push('/' + user.data.role[0] + '/dashboard');
        } catch (error) {
            console.log(error.response)
            setSingup({
                visible: true,
                message: (error.response === undefined) ? '' : error.response.data[0].message,
                error: (error.response === undefined) ? '' : error.response.data[0].field
            });
        }
    }

    const Message = () => (
        <Alert
            message={singup.message}
            closable
            type="error"
            showIcon
            onClose={() => setSingup({ visible: false, message: '' })}
        />
    );

    const Verify = () => (isAuthenticated() ? (<Redirect to='/dashboard' />) : '');

    return (
        <Layout className='total'>
            <Verify />
            <Card className='cardLogin'>
                <form onSubmit={onSubmitRegister}>
                    <div className='divImg'>
                        <img src={logo} className='img' alt="My Order" />
                    </div>
                    {singup.visible ? (<Message />) : ''}
                    <br />
                    {/*  */}
                    <div className='divInputs'>
                        <input required name='name' type='text' placeholder='Nome' className={`input ${(singup.error === 'name') ? 'inputError' : ''}`} />
                        <input required name='email' type='text' placeholder='Email' className={`input ${(singup.error === 'email') ? 'inputError' : ''}`} />
                        <input required name='username' type='text' placeholder='Usuário' className={`input ${(singup.error === 'username') ? 'inputError' : ''}`} />
                        <input required name='password' type='password' placeholder='Senha' className={`input ${(singup.error === 'password') ? 'inputError' : ''}`} />
                    </div>
                    {/*  */}
                    <div className='divButtons'>
                        <button type='submit' className='btn btn-primary'>Cadastrar</button>
                        <button className='btn btn-google'>Google</button>
                    </div>
                    {/*  */}
                    <div className='divLinks'>
                        <a href='/login' className='links'>Já sou cadastrado</a>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}
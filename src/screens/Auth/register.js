import React from 'react';

import { Layout, Card } from 'antd';

// import { Redirect } from 'react-router-dom';

import logo from './../../assets/myorder.png';

import './style.css';

export default function Login() {



    return (
        <Layout className='total'>
            <Card className='card'>
                <div className='divImg'>
                    <img src={logo} className='img' />
                </div>
                {/*  */}
                <div className='divInputs'>
                    <input type='text' placeholder='E-mail/Usuário' className='input' />
                    <input type='password' placeholder='Senha' className='input' />
                </div>
                {/*  */}
                <div className='divButtons'>
                    <button className='btn btn-primary'>Login</button>
                    <button className='btn btn-google'>Google</button>
                </div>
                {/*  */}
                <div className='divLinks'>
                    <a href='#/register' className='links'>Esqueceu a senha ?</a>
                    <a href='#' className='links'>Não é cadastrado?</a>
                </div>
            </Card>
        </Layout>
    );
}
import React from 'react';

import { Redirect } from 'react-router-dom';

import { isAuthenticated } from './../services/auth';

function NotFound() {
    // const handleUsuarioViu = (index) => {
    //     let dados = this.state.dados;
    //     alert(dados[index].usuarioViu); // Apenas para demonstrar
    //     dados[index].usuarioViu = true;
    //     this.setState({ dados: dados });
    // };
    const Verify = () => (isAuthenticated() ? (<Redirect to='/dashboard' />) : (<Redirect to='/login' />));
    return (
        <main>
            <Verify />
            <h1>Página não encontrada</h1>
        </main>
    );
}

export default NotFound;
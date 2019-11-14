import React from 'react';

import { Redirect } from 'react-router-dom';

import { isAuthenticated } from './../services/auth';

function NotFound() {
    const Verify = () => (isAuthenticated() ? (<Redirect to='/dashboard' />) : (<Redirect to='/login' />));
    return (
        <main>
            <Verify />
            <h1>Página não encontrada</h1>
        </main>
    );
}

export default NotFound;
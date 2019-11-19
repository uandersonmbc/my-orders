import React from 'react';

import { Redirect } from 'react-router-dom';

import { isAuthenticated, getRole } from './../services/auth';

function Forbidden(props) {
  const Verify = () => (isAuthenticated() ? (<Redirect to={`/${getRole()}/dashboard`} />) : (<Redirect to='/login' />));
  return (
    <main>
      <Verify />
      <h1>Você não tem autorização para acessar essa página</h1>
    </main>
  );
}

export default Forbidden;
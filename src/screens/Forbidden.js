import React from 'react';

function Forbidden(props) {
  const Verify = () => (isAuthenticated() ? (<Redirect to='/administrator' />) : '');
  return (
    <>
      <main>
        <h1>Página não encontrada</h1>
      </main>
    </>
  );
}

export default Forbidden;
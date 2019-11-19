import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import AclRouter from 'react-acl-router';
import Main from './../screens/Main';
import Blank from './../screens/Blank';
import NotFound from './../screens/NotFound';

import { privateRoutes, withoutAuthentication } from './routes';
import { getRole } from './../services/auth';

const Routes = () => (
    <BrowserRouter>
        <HashRouter basename='/'>
            <AclRouter
                authorities={getRole()}
                authorizedRoutes={privateRoutes}
                authorizedLayout={Main}
                normalRoutes={withoutAuthentication}
                normalLayout={Blank}
                notFound={NotFound}
            />
        </HashRouter>
    </BrowserRouter>
);

export default Routes;
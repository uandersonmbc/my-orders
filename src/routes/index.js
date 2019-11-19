import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AclRouter from 'react-acl-router';
import Main from './../screens/Main';
import Blank from './../screens/Blank';
import NotFound from './../screens/NotFound';

import { privateRoutes, withoutAuthentication } from './routes';
import { getRole } from './../services/auth';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <AclRouter
                authorities={getRole()}
                authorizedRoutes={privateRoutes}
                authorizedLayout={Main}
                normalRoutes={withoutAuthentication}
                normalLayout={Blank}
                notFound={NotFound}
            />
        </Switch>
    </BrowserRouter>
);

export default Routes;
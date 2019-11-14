import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AclRouter from 'react-acl-router';
import Main from './../screens/Main';
import Blank from './../screens/Blank';
import NotFound from './../screens/NotFound';

import { authorizedRoutes, normalRoutes } from './routes';
import { getRole } from './../services/auth';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <AclRouter
                authorities={getRole()}
                authorizedRoutes={authorizedRoutes}
                authorizedLayout={Main}
                normalRoutes={normalRoutes}
                normalLayout={Blank}
                notFound={NotFound}
            />
        </Switch>
    </BrowserRouter>
);

export default Routes;
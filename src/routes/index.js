import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AclRouter from 'react-acl-router';
import { isAuthenticated } from './../services/auth';
import Main from './../screens/Main';
import Blank from './../screens/Blank';

import { authorizedRoutes, normalRoutes } from './routes';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <AclRouter
                authorities='admin'
                authorizedRoutes={authorizedRoutes}
                authorizedLayout={Main}
                normalRoutes={normalRoutes}
                normalLayout={Blank}
                notFound={() => <div>Page Not Found</div>}
            />
        </Switch>
    </BrowserRouter>
);

export default Routes;
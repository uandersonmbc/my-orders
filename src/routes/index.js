import React from 'react';
import {
    BrowserRouter, Route, HashRouter, Redirect,
} from 'react-router-dom';
import { isAuthenticated } from './../services/auth';
import Main from './../screens/Main';
import { Login } from '../screens/Auth';

import privateRoutes from './privateRoutes';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (isAuthenticated() ? (
            <Component {...props} role={rest.role} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            ))
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <HashRouter basename="/">
            <Route exact path="/" component={Login} />
            <Route exact path="/singup" component={Login} />
            <PrivateRoute path="/administrator" component={Main} role={privateRoutes.administrator} />
            <PrivateRoute path="/manager" component={Main} role={privateRoutes.manager} />
            <PrivateRoute path="/waiter" component={Main} role={privateRoutes.waiter} />
            <PrivateRoute path="/customer" component={Main} role={privateRoutes.customer} />
        </HashRouter>
    </BrowserRouter>
);

export default Routes;
import React from 'react';
import {
    BrowserRouter, Route, HashRouter, Redirect,
} from 'react-router-dom';
import { isAuthenticated } from './../services/auth';
import Main from './../screens/Main';
import { Login } from '../screens/Auth';

console.log(isAuthenticated());

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            ))
        }
    />
);

// https://reacttraining.com/react-router/web/example/basic

const Routes = () => (
    <BrowserRouter>
        <HashRouter basename="/">
            <Route exact path="/" component={Login} />
            <Route exact path="/singup" component={Login} />
            <PrivateRoute path="/app" component={Main} />
        </HashRouter>
    </BrowserRouter>
);

export default Routes;
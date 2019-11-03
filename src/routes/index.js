import React from 'react';
import {
    BrowserRouter, Route, HashRouter, Redirect,
} from 'react-router-dom';
import auth from './../services/auth';
import Main from './../screens/Main';
import Login from './../screens/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (true ? (
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
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Main} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </HashRouter>
    </BrowserRouter>
);

export default Routes;
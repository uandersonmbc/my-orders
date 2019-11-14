import Dashboard from '../screens/contents/Dashboard';
import NotFound from '../screens/Forbidden';
import { Login } from './../screens/Auth';

const role = {
    admin: '',
    manager: '',
    waiter: '',
    customer: ''
}

export const authorizedRoutes = [{
    path: '/dashboard',
    exact: true,
    permissions: ['admin', 'user'],
    redirect: '/login',
    component: Dashboard,
}];

export const normalRoutes = [{
    path: '/register',
    exact: true,
    redirect: '/',
}, {
    path: '/login',
    exact: true,
    component: Login,
}];
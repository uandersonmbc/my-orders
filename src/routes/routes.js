import { Login, Register } from './../screens/Auth';
import Forbidden from '../screens/Forbidden';
import Dashboard from '../screens/contents/Dashboard';
import Product from '../screens/contents/Product';
import Report from '../screens/contents/Report';
import Order from '../screens/contents/Order';

const role = {
    admin: '',
    manager: '',
    waiter: '',
    customer: ''
}

export const authorizedRoutes = [
    {
        path: '/dashboard',
        exact: true,
        permissions: ['admin', 'manager'],
        redirect: '/forbidden',
        component: Dashboard,
    },
    {
        path: '/cashiers',
        exact: true,
        permissions: ['admin'],
        redirect: '/forbidden',
        component: Dashboard,
    },
    {
        path: '/orders',
        exact: true,
        permissions: ['admin', 'manager'],
        redirect: '/forbidden',
        component: Order,
    },
    {
        path: '/products',
        exact: true,
        permissions: ['admin', 'manager'],
        redirect: '/forbidden',
        component: Product,
    },
    {
        path: '/reports',
        exact: true,
        permissions: ['admin', 'manager'],
        redirect: '/forbidden',
        component: Report,
    },
];

export const normalRoutes = [
    {
        path: '/Login',
        exact: true,
        component: Login,
    }, {
        path: '/register',
        exact: true,
        component: Register,
    }, {
        path: '/forbidden',
        exact: true,
        component: Forbidden,
    },
];
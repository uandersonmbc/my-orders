import { Login, Register } from './../screens/Auth';
import { Adminmanager, Customer, Waiter } from './../screens/contents/Dashboard';
import Forbidden from '../screens/Forbidden';
import Product from '../screens/contents/Product';
import Report from '../screens/contents/Report';
import Order from '../screens/contents/Order';
import Cashier from '../screens/contents/Cashier';
import Category from '../screens/contents/Category';
import Ingredient from '../screens/contents/Ingredient';

export const privateRoutes = [
    // Administrador e Gerente
    {
        path: '/customer/dashboard',
        exact: true,
        permissions: ['customer'],
        redirect: '/forbidden',
        component: Customer,
    },
    {
        path: '/waiter/dashboard',
        exact: true,
        permissions: ['waiter'],
        redirect: '/forbidden',
        component: Waiter,
    },
    {
        path: '/*/dashboard',
        exact: true,
        permissions: ['administrator', 'manager'],
        redirect: '/forbidden',
        component: Adminmanager,
    },
    {
        path: '/cashiers',
        exact: true,
        permissions: ['administrator', 'manager'],
        redirect: '/forbidden',
        component: Cashier,
    },
    {
        path: '/categories',
        exact: true,
        permissions: ['administrator', 'manager'],
        redirect: '/forbidden',
        component: Category,
    },
    {
        path: '/ingredients',
        exact: true,
        permissions: ['administrator', 'manager'],
        redirect: '/forbidden',
        component: Ingredient,
    },
    {
        path: '/orders',
        exact: true,
        permissions: ['administrator', 'manager'],
        redirect: '/forbidden',
        component: Order,
    },
    {
        path: '/products',
        exact: true,
        permissions: ['administrator', 'manager'],
        redirect: '/forbidden',
        component: Product,
    },
    {
        path: '/reports',
        exact: true,
        permissions: ['administrator', 'manager'],
        redirect: '/forbidden',
        component: Report,
    },
];

export const withoutAuthentication = [
    {
        path: '/login',
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
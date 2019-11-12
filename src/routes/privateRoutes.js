import Dashboard from '../screens/contents/Dashboard';
import Employees from '../screens/contents/Employees';
import NotFound from './../screens/NotFound';

export default {
    administrator: [
        {
            path: '/administrator',
            exact: true,
            component: Dashboard
        },
        {
            path: '/administrator/employees',
            exact: true,
            component: Employees
        },
        {
            path: '*',
            component: NotFound,
        },
    ],
    manager: [],
    waiter: [],
    customer: []
};
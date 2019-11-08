import Dashboard from '../screens/contents/Dashboard';
import Employees from '../screens/contents/Employees';
import NotFound from './../screens/NotFound';

export default [
  {
    path: '/app',
    exact: true,
    component: Dashboard
  },
  {
    path: '/app/employees',
    exact: true,
    component: Employees
  },
  {
    path: '*',
    component: NotFound,
  },
];
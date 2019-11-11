import Dashboard from '../screens/contents/Dashboard';
import Product from '../screens/contents/Product';
import NotFound from './../screens/NotFound';

export default [
  {
    path: '/app',
    exact: true,
    component: Dashboard
  },
  {
    path: '/app/produtos',
    exact: true,
    component: Product
  },
  {
    path: '*',
    component: NotFound,
  },
];
import Dashboard from '../screens/contents/Dashboard';
import Employees from '../screens/contents/Employees';
import NotFound from './../screens/NotFound';

export default [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/employees',
    exact: true,
    component: Employees
  },
  // {
  //   path: '/checklists',
  //   exact: true,
  //   component: Checklists,
  //   sidebar: () => <div>Checklists</div>,
  // },
  {
    path: '*',
    component: NotFound,
  },
];
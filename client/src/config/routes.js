// import layout 
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutClient from '../layouts/LayoutClient';

// import pages admin
import AdminHome from '../pages/Admin';
import AdminSingIn from '../pages/Admin/SingIn';
import AdminBusiness from '../pages/Admin/Business';
import AdminBusinessEdit from '../pages/Admin/Business/Edit';
import AdminProfile from '../pages/Admin/Profile';
import AdminFiles from '../pages/Admin/Files';

// import pages client
import Home from '../pages/Home';
import Contact from '../pages/Contact';
// other
import Error404 from '../pages/Error404';

const routes = [
  {
    path: '/admin',
    component : LayoutAdmin,
    exact: false,
    routes: [
      {
        path: '/admin',
        component: AdminHome,
        exact: true
      },
      {
        path: '/admin/login',
        component: AdminSingIn,
        exact: true
      },
      {
        path: '/admin/profile',
        component: AdminProfile,
        exact: true
      },
      {
        path: '/admin/business',
        component: AdminBusiness,
        exact: true
      },
      {
        path: '/admin/business/edit',
        component: AdminBusinessEdit,
        exact: true
      },
      {
        path: '/admin/files',
        component: AdminFiles,
        exact: true
      },
      {
        component: Error404
      }
    ]
  },
  {
    path: '/',
    component : LayoutClient,
    exact: false,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true
      },
      {
        path: '/contact',
        component: Contact,
        exact: true
      },
    ]
  }
];

export default routes;
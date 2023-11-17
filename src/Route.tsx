import { redirect, RootRoute, Route, Router } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import { authenticateUser } from './api';
import { userContext } from './signals/users.signals';
import Dashboard from './views/dashboard';
import Home from './views/home';
import Login from './views/login';
import Signup from './views/signup';

const handleProtectedRoute = async () => {
  if (!userContext.value?.id) {
    if (!Cookies.get('sid')) {
      throw redirect({
        to: '/login',
        search: {
          redirect: router.state.location.href,
        },
      });
    } else {
      const response = await authenticateUser();

      if ('data' in response && response.data.user) {
        userContext.value = response.data.user;
      } else {
        throw redirect({
          to: '/login',
          search: {
            redirect: router.state.location.href,
          },
        });
      }
    }
  }
};

const rootRoute = new RootRoute({});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
const signupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'signup',
  component: Signup,
});
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: Login,
});
const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: Dashboard,
  loader: handleProtectedRoute,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  indexRoute,
  loginRoute,
  signupRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}

export default router;

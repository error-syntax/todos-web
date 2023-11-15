import { RootRoute, Route, Router, redirect } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import Home from './views/home';
import Login from './views/login';
import Signup from './views/signup';
import Dashboard from './views/dashboard';
import { userContext } from './signals/user.signals';
import { authenticateUser } from './api';

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
  loader: async () => {
    if (!userContext.value.id) {
      if (!Cookies.get('sid')) {
        throw redirect({
          to: '/login',
          search: {
            redirect: router.state.location.href,
          },
        });
      } else {
        const response = await authenticateUser();

        if ('data' in response) {
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
  },
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

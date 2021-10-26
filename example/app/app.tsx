import { pwf, jsx } from '../../src'; // Same as `import { pwf } from 'pwf';`
import { Nav } from './components';
import { Auth } from './services';
import { Error404, Home, Login } from './views';

if (Auth.isLoggedIn()) {
  Auth.getUser(localStorage.getItem('uid'));
}

pwf.router.init([
  {
    path: '/',
    component: () => {
      return (
        <div>
          <Nav />
          <Home />
        </div>
      );
    },
  },
  {
    path: '/login/',
    component: () => {
      return (
        <div>
          <Nav />
          <Login />
        </div>
      );
    },
  },
  {
    path: '/:404',
    component: () => {
      return (
        <div>
          <Nav />
          <Error404 />
        </div>
      );
    },
  },
]);

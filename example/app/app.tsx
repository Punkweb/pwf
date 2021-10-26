import { pwf, jsx } from '../../src'; // Same as `import { pwf } from 'pwf';`
import Auth from './services/auth';
import Nav from './components/nav/nav';
import Error404 from './views/error404/error404';
import Home from './views/home/home';
import Login from './views/login/login';

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

console.log(pwf.router.routes);

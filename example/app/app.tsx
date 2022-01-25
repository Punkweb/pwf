import { pwf } from '../../lib'; // Same as `import { pwf } from 'pwf';`
import { Nav } from './components';
import { Auth } from './services';
import { Error404, Home, Login, SignUp } from './views';

if (Auth.isLoggedIn()) {
  Auth.getUser(localStorage.getItem('uid'));
}

let root = document.querySelector('app-root');

pwf.router.init(root, [
  {
    path: '/',
    component: (
      <>
        <Nav />
        <Home />
      </>
    ),
  },
  {
    path: '/login/',
    component: () => (
      <>
        <Nav />
        <Login />
      </>
    ),
  },
  {
    path: '/sign-up/',
    component: () => (
      <>
        <Nav />
        <SignUp />
      </>
    ),
  },
  {
    path: '/:404',
    component: () => (
      <>
        <Nav />
        <Error404 />
      </>
    ),
  },
]);

import { pwf, h } from '../../lib'; // Same as `import { pwf } from 'pwf';`
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
    component: () => (
      <div>
        <Nav />
        <Home />
      </div>
    ),
  },
  {
    path: '/login/',
    component: () => h('div', {}, [h(Nav), h(Login)]),
  },
  {
    path: '/sign-up/',
    component: () => h('div', {}, [h(Nav), h(SignUp)]),
  },
  {
    path: '/:404',
    component: () => h('div', {}, [h(Nav), h(Error404)]),
  },
]);

import { pwf } from '../../lib'; // Same as `import { pwf } from 'pwf';`
import { Nav } from './components';
import { Auth } from './services';
import { Error404, Home, Login, SignUp } from './views';

if (Auth.isLoggedIn()) {
  Auth.getUser(localStorage.getItem('uid'));
}

let root = document.querySelector('app-root');

const MainLayout = (props: any, children: any) => (
  <>
    <Nav />
    {children}
  </>
);

pwf.router.init(root, [
  {
    path: '/',
    component: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: '/login/',
    component: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: '/sign-up/',
    component: (
      <MainLayout>
        <SignUp />
      </MainLayout>
    ),
  },
  {
    path: '/:404',
    component: (
      <MainLayout>
        <Error404 />
      </MainLayout>
    ),
  },
]);

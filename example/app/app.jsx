import { App, jsx } from '../../lib'; // Same as `import { App, jsx } from 'pwf';`
import Auth from './services/auth';
import Nav from './components/nav/nav.jsx';
import Error404 from './views/error404/error404.jsx';
import Home from './views/home/home.jsx';
import Login from './views/login/login.jsx';
import '~/scss/defaults.scss';
import './app.scss';

if (Auth.isLoggedIn()) {
  Auth.getUser(localStorage.getItem('uid'));
}

function Punkweb() {
  let user = null;
  const userSub = Auth.user$.subscribe((u) => {
    if (u) {
      user = u;
    }
  });

  return (
    <div class={{ app: true }}>
      {Nav()}
      <div class={{ main: true }}>
        <div class={{ outlet: true }}>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  );
}

let app = new App({
  routes: [
    { path: '/', component: Home },
    { path: '/login/', component: Login },
    { path: '/:404', component: Error404 },
  ],
  bootstrap: Punkweb,
});

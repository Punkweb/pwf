import { App } from '../../lib'; // Same as `import { App } from 'pwf';`
import Auth from './services/auth';
import Nav from './components/nav/nav';
import Home from './views/home/home';
import Login from './views/login/login';
import '~/scss/defaults.scss';
import './app.scss';

if (Auth.isLoggedIn()) {
  Auth.getUser(localStorage.getItem('uid'));
}

class Punkweb extends HTMLElement {
  connectedCallback() {
    console.log('connected app');
    this.innerHTML = `
      <div class="app">
        <app-nav></app-nav>
        <div class="main">
          <div class="outlet">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    `;
  }
}

class Error404 extends HTMLElement {
  connectedCallback() {
    console.log('connected error');
    this.innerHTML = `
      <div class="container">
        <h1>Page not found!</h1>
      </div>
    `;
  }
}

let app = new App({
  declarations: [
    {
      selector: 'app-punkweb',
      class: Punkweb,
    },
    {
      selector: 'app-error',
      class: Error404,
    },
    {
      selector: 'app-nav',
      class: Nav,
    },
    {
      selector: 'app-home',
      class: Home,
    },
    {
      selector: 'app-login',
      class: Login,
    },
  ],
  routes: [
    { path: '/', selector: 'app-home' },
    { path: '/login/', selector: 'app-login' },
    { path: '/:404', selector: 'app-error' },
  ],
  bootstrap: 'app-punkweb',
});

import { App } from '../../lib';
import Nav from './components/nav/nav';
import Home from './views/home/home';
import Login from './views/login/login';
import '~/scss/defaults.scss';
import './app.scss';

class AppComponent extends HTMLElement {
  connectedCallback() {
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

let app = new App({
  declarations: [
    {
      selector: 'app-component',
      class: AppComponent,
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
  ],
  bootstrap: 'app-component',
});

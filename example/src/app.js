import { App, Component } from '../../lib';
import Home from './views/home/home';
import '~/scss/defaults.scss';

class Nav extends HTMLElement {
  static selector = 'app-nav';

  connectedCallback() {
    this.innerHTML = 'Test Nav';
  }
}

class Punkweb extends HTMLElement {
  static selector = 'app-punkweb';

  connectedCallback() {
    this.innerHTML = `
      <app-nav></app-nav>
      <router-outlet></router-outlet>
    `;
  }
}

let punkweb = new App({
  declarations: [Punkweb, Nav, Home],
  routes: [
    { path: '/', component: Home },
    { path: '/other/', component: Home },
  ],
  bootstrap: Punkweb,
});

punkweb.router = null;

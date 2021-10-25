import { App, Component } from '../../lib'; // Same as `import { App, Component } from 'pwf';`
import { html } from 'lit-html';
import Auth from './services/auth';
import Nav from './components/nav/nav';
import Error404 from './views/error404/error404';
import Home from './views/home/home';
import Login from './views/login/login';
import Music from './views/music/music';
import Album from './views/music/album/album';
import Artist from './views/music/artist/artist';
import '~/scss/defaults.scss';
import './app.scss';

if (Auth.isLoggedIn()) {
  Auth.getUser(localStorage.getItem('uid'));
}

class Punkweb extends Component {
  init() {
    console.log('init punkweb');
    this.nav = new Nav();
  }

  render() {
    console.log('render punkweb');
    return html`
      <div class="app">
        ${this.nav.render()}
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
  routes: [
    { path: '/', component: Home },
    { path: '/login/', component: Login },
    { path: '/music/', component: Music },
    { path: '/music/album/:slug/', component: Album },
    { path: '/music/artist/:slug/', component: Artist },
    { path: '/:404', component: Error404 },
  ],
  bootstrapComponent: Punkweb,
});

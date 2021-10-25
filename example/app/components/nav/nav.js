import { html, App, Component, Router } from '../../../../lib';
import Auth from '../../services/auth';
import './nav.scss';

class Nav extends Component {
  init() {
    console.log('init nav');
    this.userSub = Auth.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        App.redraw();
      }
    });
  }

  // disconnectedCallback() {
  //   console.log('disconnected nav');
  //   if (this.userSub) {
  //     this.userSub.unsubscribe();
  //   }
  // }

  clickSignOut = {
    handleEvent(e) {
      e.preventDefault();
      Auth.logout();
      Router.navigate('/login/');
    },
  };

  render() {
    console.log('render nav');
    return html`
      <div class="nav">
        <div class="container">
          <div class="nav-content">
            <a class="nav-title" router-link="/">punkweb</a>
            <div class="nav-links">
              <a class="nav-link" router-link="/music/" title="Music">
                <span class="nav-link-icon"><i class="fas fa-music fa-fw"></i></span>
                <span>Music</span>
              </a>
            </div>
            <div class="nav-spacer"></div>
            ${this.user
              ? html`<div class="nav-links">
                  <a class="nav-link" @click=${this.clickSignOut} title="Sign Out">
                    <i class="nav-link-icon fas fa-sign-out-alt"></i>
                    <span class="hide-on-mobile">Sign Out</span>
                  </a>
                </div>`
              : html`<div class="nav-links">
                  <a class="nav-link" router-link="/sign-up/" title="Sign Up">
                    <i class="nav-link-icon fas fa-user-plus"></i>
                    <span class="hide-on-mobile">Sign Up</span>
                  </a>
                  <a class="nav-link" router-link="/login/" title="Login">
                    <i class="nav-link-icon fas fa-sign-in-alt"></i>
                    <span class="hide-on-mobile">Login</span>
                  </a>
                </div>`}
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = Nav;

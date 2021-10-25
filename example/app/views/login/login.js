import { html, Component, Router } from '../../../../lib';
import Auth from '../../services/auth';
import './login.scss';

class Login extends Component {
  init() {
    console.log('init login');
  }

  afterRender() {
    let signInForm = document.querySelector('#signInForm');
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let usernameInput = document.querySelector('#username');
      let passwordInput = document.querySelector('#password');
      Auth.login({ username: usernameInput.value, password: passwordInput.value }).then(() => {
        Router.navigate('/');
      });
    });
  }

  render() {
    console.log('render login');
    return html`
      <!-- <app-page-header [breadcrumbs]="breadcrumbs"></app-page-header> -->
      <div class="container">
        <div class="login">
          <div class="panel">
            <div class="panel-body padding">
              <form id="signInForm">
                <h2 class="login-header">Sign in</h2>
                <label>Username</label>
                <input id="username" class="full-width margin-bottom" type="text" name="username" />
                <label>Password</label>
                <input id="password" class="full-width margin-bottom" type="password" name="password" />
                <button id="signIn" class="button-primary full-width margin-bottom">Sign in</button>
                <!-- <button class="button-primary full-width margin-bottom" [disabled]="signInDisabled()" (click)="signIn()">Sign in</button> -->
                <div>New Here? <a router-link="/sign-up/">Sign up</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = Login;

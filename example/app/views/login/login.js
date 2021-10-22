import Auth from '../../services/auth';
import { Router } from '../../../../lib';
import template from './login.html';
import './login.scss';

class Login extends HTMLElement {
  connectedCallback() {
    console.log('connected login');
    this.innerHTML = template;
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
}

module.exports = Login;

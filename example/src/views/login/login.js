import template from './login.html';
import './login.scss';

class Login extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }
}

module.exports = Login;

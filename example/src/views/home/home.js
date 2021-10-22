import template from './home.html';
import Auth from '../../services/auth';

class Home extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }
}

module.exports = Home;

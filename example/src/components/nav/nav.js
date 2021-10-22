import template from './nav.html';
import './nav.scss';

class Nav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }
}

module.exports = Nav;

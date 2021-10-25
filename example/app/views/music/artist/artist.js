import template from './artist.html';
import './artist.scss';

class Artist extends HTMLElement {
  connectedCallback() {
    console.log('connected artist');
    this.innerHTML = template;
  }
}

module.exports = Artist;

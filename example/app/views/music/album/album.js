import template from './album.html';
import './album.scss';

class Album extends HTMLElement {
  connectedCallback() {
    console.log('connected album');
    this.innerHTML = template;
  }
}

module.exports = Album;

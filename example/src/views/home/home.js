import template from './home.html';

class Home extends HTMLElement {
  static selector = 'app-home';

  connectedCallback() {
    this.innerHTML = template;
    document.querySelector('#clickTest').addEventListener('click', (e) => {
      console.log('worked');
    });
  }
}

module.exports = Home;

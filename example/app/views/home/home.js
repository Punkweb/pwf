import Auth from '../../services/auth';
import template from './home.html';

class Home extends HTMLElement {
  connectedCallback() {
    console.log('connected home');
    this.innerHTML = template;
    this.userSub = Auth.user$.subscribe((user) => {
      console.log(user);
      if (user) {
        let usernameSpan = document.querySelector('#username');
        usernameSpan.textContent = user.username;
      }
    });
  }

  disconnectedCallback() {
    console.log('disconnnected home');
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}

module.exports = Home;

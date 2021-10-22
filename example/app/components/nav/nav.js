import { Router } from '../../../../lib';
import Auth from '../../services/auth';
import template from './nav.html';
import './nav.scss';

class Nav extends HTMLElement {
  connectedCallback() {
    console.log('connected nav');
    this.innerHTML = template;
    this.userSub = Auth.user$.subscribe((user) => {
      let unauthedLinks = document.querySelector('#unauthedLinks');
      let authedLinks = document.querySelector('#authedLinks');
      if (user) {
        unauthedLinks.style.display = 'none';
        authedLinks.style.display = 'block';
      } else {
        unauthedLinks.style.display = 'block';
        authedLinks.style.display = 'none';
      }
      let signOutLink = document.querySelector('#signOutLink');
      signOutLink.addEventListener('click', (e) => {
        Auth.logout();
        Router.navigate('/login/');
      });
    });
  }

  disconnectedCallback() {
    console.log('disconnected nav');
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}

module.exports = Nav;

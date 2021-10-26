import { Router, jsx } from '../../../../lib';
import Auth from '../../services/auth';
import './nav.scss';

function Nav() {
  let user = null;
  const userSub = Auth.user$.subscribe((u) => {
    user = u;
  });

  return (
    <div class={{ nav: true }}>
      <div class={{ container: true }}>
        <div class={{ 'nav-content': true }}>
          <a class={{ 'nav-title': true }} attrs={{ 'router-link': '/' }}>
            punkweb
          </a>
          <div class={{ 'nav-links': true }}>
            <a class={{ 'nav-link': true }} attrs={{ 'router-link': '/music/', 'title': 'Music' }}>
              <span class={{ 'nav-link-icon': true }}>
                <i class={{ 'fas': true, 'fa-music': true, 'fa-fw': true }}></i>
              </span>
              <span>Music</span>
            </a>
          </div>
          <div class={{ 'nav-spacer': true }}></div>
          {user ? (
            <div class={{ 'nav-links': true }}>
              <a
                class={{ 'nav-link': true }}
                on={{
                  click: (e) => {
                    if (e) {
                      e.preventDefault();
                    }
                    Auth.logout();
                    Router.navigate('/login/');
                  },
                }}
                attrs={{
                  title: 'Sign Out',
                }}
              >
                <i class={{ 'nav-link-icon': true, 'fas': true, 'fa-sign-out-alt': true }}></i>
                <span class={{ 'hide-on-mobile': true }}>Sign Out</span>
              </a>
            </div>
          ) : (
            <div class={{ 'nav-links': true }}>
              <a class={{ 'nav-link': true }} attrs={{ 'router-link': '/sign-up/', 'title': 'Sign Up' }}>
                <i class={{ 'nav-link-icon': true, 'fas': true, 'fa-user-plus': true }}></i>
                <span class={{ 'hide-on-mobile': true }}>Sign Up</span>
              </a>
              <a class={{ 'nav-link': true }} attrs={{ 'router-link': '/login/', 'title': 'Login' }}>
                <i class={{ 'nav-link-icon': true, 'fas': true, 'fa-sign-in-alt': true }}></i>
                <span class={{ 'hide-on-mobile': true }}>Login</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

module.exports = Nav;

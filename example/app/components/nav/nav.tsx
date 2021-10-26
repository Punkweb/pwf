import { pwf, jsx } from '../../../../src';
import { Auth } from '../../services';

let user = null;
Auth.user$.subscribe((u) => {
  user = u;
  pwf.redraw();
});

export default function Nav() {
  return (
    <div class={{ container: true }}>
      <h1>
        <a attrs={{ 'router-link': '/' }}>punkweb</a>
      </h1>
      {user ? (
        <ul>
          <li>
            <a
              on={{
                click: (e: any) => {
                  e.preventDefault();
                  Auth.logout();
                  pwf.router.navigate('/login/');
                },
              }}
            >
              Sign Out
            </a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <a attrs={{ 'router-link': '/sign-up/' }}>Sign Up</a>
          </li>
          <li>
            <a attrs={{ 'router-link': '/login/' }}>Login</a>
          </li>
        </ul>
      )}
    </div>
  );
}

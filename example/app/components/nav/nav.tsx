import { pwf, jsx } from '../../../../lib';
import { Auth } from '../../services';

let user = null;
Auth.user$.subscribe((u) => {
  user = u;
});

export default function Nav() {
  return (
    <div class={{ container: true }}>
      <h1>
        <a style={{ color: '#212529' }} attrs={{ 'router-link': '/' }}>
          PUNKWEB
        </a>
      </h1>
      {user ? (
        <ul>
          <li>
            <a attrs={{ 'router-link': '/error/' }}>Error Page</a>
          </li>
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
            <a attrs={{ 'router-link': '/error/' }}>Error Page</a>
          </li>
          <li>
            <a attrs={{ 'router-link': '/sign-up/' }}>Sign Up</a>
          </li>
          <li>
            <a attrs={{ 'router-link': '/login/' }}>Login</a>
          </li>
        </ul>
      )}
      <hr />
    </div>
  );
}

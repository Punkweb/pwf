import { pwf, jsx } from '../../../../src';
import Auth from '../../services/auth';

let user = null;
const userSub = Auth.user$.subscribe((u) => {
  user = u;
  pwf.router.redraw();
});

export default function Nav() {
  return (
    <div class={{ container: true }}>
      <a attrs={{ 'router-link': '/' }}>
        <h1>punkweb</h1>
      </a>
      {user ? (
        <div>
          <a
            on={{
              click: (e) => {
                if (e) {
                  e.preventDefault();
                }
                Auth.logout();
                pwf.router.navigate('/login/');
              },
            }}
          >
            Sign Out
          </a>
        </div>
      ) : (
        <div>
          <div>
            <a attrs={{ 'router-link': '/sign-up/' }}>Sign Up</a>
          </div>
          <div>
            <a attrs={{ 'router-link': '/login/' }}>Login</a>
          </div>
        </div>
      )}
    </div>
  );
}

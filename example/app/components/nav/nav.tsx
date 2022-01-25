import { pwf } from '../../../../lib';
import { Auth } from '../../services';

let user: any = null;
Auth.user$.subscribe((u) => {
  user = u;
});

export default function Nav() {
  return (
    <div class="container">
      <h1>
        <a style="color: #212529" router-link="/">
          PUNKWEB
        </a>
      </h1>
      {user ? (
        <ul>
          <li>
            <a router-link="/error/">Error Page</a>
          </li>
          <li>
            <a
              onClick={(e: any) => {
                e.preventDefault();
                Auth.logout();
                pwf.router.navigate('/login/');
              }}
            >
              Sign Out
            </a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <a router-link="/login/">Login</a>
          </li>
          <li>
            <a router-link="/sign-up/">Sign Up</a>
          </li>
          <li>
            <a router-link="/error/">Error Page</a>
          </li>
        </ul>
      )}
      <hr />
    </div>
  );
}

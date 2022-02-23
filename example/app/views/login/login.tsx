import { pwf } from '../../../../lib';
import { Auth } from '../../services';

let username = '';
let password = '';

function login(e: any) {
  e.preventDefault();
  Auth.login({ username, password }).then(() => {
    username = '';
    password = '';
    pwf.router.navigate('/');
  });
}

export default function Login() {
  return (
    <div class="container">
      <form style="margin: 0 auto; width: 288px" onSubmit={(e: any) => login(e)}>
        <h1>Login</h1>
        <label for="username">Username</label>
        <input
          class="ss-input ss-fluid"
          type="text"
          name="username"
          value={username}
          onInput={(e: any) => {
            username = e.target.value;
          }}
        />
        <label for="password">Password</label>
        <input
          class="ss-input ss-fluid"
          type="password"
          name="password"
          value={password}
          onInput={(e: any) => {
            password = e.target.value;
          }}
        />
        <button class="ss-button-raised ss-primary ss-fluid" style="margin: 1rem 0;" type="submit">
          Login
        </button>
        <div>
          New Here? <a router-link="/sign-up/">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

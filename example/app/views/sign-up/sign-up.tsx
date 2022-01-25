import { pwf } from '../../../../lib';
import { Auth } from '../../services';

let username = '';
let password = '';

function signup(e: any) {
  e.preventDefault();
  Auth.signup({ username, password }).then(() => {
    username = '';
    password = '';
    pwf.router.navigate('/login/');
  });
}

export default function SignUp() {
  return (
    <div class="container">
      <form style="margin: 0 auto; width: 288px" onSubmit={(e: any) => signup(e)}>
        <h1>Sign Up</h1>
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
          Sign Up
        </button>
        <div>
          Have an account? <a router-link="/login/">Login</a>
        </div>
      </form>
    </div>
  );
}

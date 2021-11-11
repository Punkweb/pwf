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
    <div className="container">
      <form style="margin: 0 auto; width: 280px" onSubmit={(e: any) => signup(e)}>
        <h1>Sign Up</h1>
        <label>Username</label>
        <input
          style="width: 100%"
          type="text"
          name="username"
          value={username}
          onInput={(e: any) => {
            username = e.target.value;
          }}
        />
        <label>Password</label>
        <input
          style="width: 100%"
          type="password"
          name="password"
          value={password}
          onInput={(e: any) => {
            password = e.target.value;
          }}
        />
        <button style="width: 100%" className="button" type="submit">
          Sign Up
        </button>
        <div>
          Have an account? <a router-link="/login/">Login</a>
        </div>
      </form>
    </div>
  );
}

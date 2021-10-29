import { pwf, jsx } from '../../../../lib';
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
      <form
        style={{
          margin: '0 auto',
          width: '280px',
        }}
        on={{ submit: (e: any) => signup(e) }}
      >
        <h1>Sign Up</h1>
        <label>Username</label>
        <input
          style={{ width: '100%' }}
          attrs={{ type: 'text', name: 'username', value: username }}
          on={{
            input: (e: any) => {
              username = e.target.value;
            },
          }}
        />
        <label>Password</label>
        <input
          style={{ width: '100%' }}
          attrs={{ type: 'password', name: 'password', value: password }}
          on={{
            input: (e: any) => {
              password = e.target.value;
            },
          }}
        />
        <button style={{ width: '100%' }} className="button" attrs={{ type: 'submit' }}>
          Sign Up
        </button>
        <div>
          Have an account? <a attrs={{ 'router-link': '/login/' }}>Login</a>
        </div>
      </form>
    </div>
  );
}

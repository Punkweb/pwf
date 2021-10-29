import { pwf, jsx } from '../../../../lib';
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
    <div className="container">
      <form
        style={{
          margin: '0 auto',
          width: '280px',
        }}
        on={{ submit: (e: any) => login(e) }}
      >
        <h1>Login</h1>
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
          Login
        </button>
        <div>
          New Here? <a attrs={{ 'router-link': '/sign-up/' }}>Sign Up</a>
        </div>
      </form>
    </div>
  );
}

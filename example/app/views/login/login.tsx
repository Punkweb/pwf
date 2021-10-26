import { pwf, jsx } from '../../../../src';
import { Auth } from '../../services';

export default function Login() {
  let username = '';
  let password = '';

  function login(e: any) {
    e.preventDefault();
    Auth.login({ username, password })
      .then(() => {
        pwf.router.navigate('/');
      })
      .catch((err) => {
        console.log('login err', err);
      });
  }

  return (
    <div class={{ container: true }}>
      <form on={{ submit: (e: any) => login(e) }}>
        <h1>Sign in</h1>
        <label>Username</label>
        <input
          attrs={{ type: 'text', name: 'username', value: username }}
          on={{
            input: (e: any) => {
              username = e.target.value;
            },
          }}
        />
        <label>Password</label>
        <input
          attrs={{ type: 'password', name: 'password', value: password }}
          on={{
            input: (e: any) => {
              password = e.target.value;
            },
          }}
        />
        <button attrs={{ type: 'submit' }}>Sign in</button>
        <div>
          New Here? <a attrs={{ 'router-link': '/sign-up/' }}>Sign Up</a>
        </div>
      </form>
    </div>
  );
}
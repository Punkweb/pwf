import { Router, jsx } from '../../../../lib';
import Auth from '../../services/auth';
import './login.scss';

function Login() {
  let username = '';
  let password = '';

  function login(e) {
    e.preventDefault();
    Auth.login({ username, password })
      .then(() => {
        Router.navigate('/');
      })
      .catch((err) => {
        console.log('login err', err);
      });
  }

  return (
    <div class={{ container: true }}>
      <div class={{ login: true }}>
        <div class={{ panel: true }}>
          <div class={{ 'panel-body': true, 'padding': true }}>
            <form
              on={{
                submit: (e) => login(e),
              }}
            >
              <h2 class={{ 'login-header': true }}>Sign in</h2>
              <label>Username</label>
              <input
                class={{ 'full-width': true, 'margin-bottom': true }}
                props={{ type: 'text', name: 'username', value: username }}
                on={{
                  input: (e) => {
                    username = e.target.value;
                  },
                }}
              />
              <label>Password</label>
              <input
                class={{ 'full-width': true, 'margin-bottom': true }}
                props={{ type: 'password', name: 'password', value: password }}
                on={{
                  input: (e) => {
                    password = e.target.value;
                  },
                }}
              />
              <button
                class={{ 'button-primary': true, 'full-width': true, 'margin-bottom': true }}
                props={{ type: 'submit' }}
              >
                Sign in
              </button>
              <div>
                New Here? <a props={{ 'router-link': '/sign-up/' }}>Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = Login;

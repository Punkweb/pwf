import { html, Component } from '../../../../lib';

class Error404 extends Component {
  init() {
    console.log('init error404');
  }

  render() {
    console.log('render error404');
    return html`
      <div class="container">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you requested does not exist or an error occured.</p>
        <a id="homeBtn" class="button" router-link="/">Take me home</a>
      </div>
    `;
  }
}

module.exports = Error404;

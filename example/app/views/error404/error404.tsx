import { pwf } from '../../../../lib';

export default function Error404() {
  return (
    <div class="container">
      <div style="margin: 0 auto; width: 288px">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you requested does not exist or an error occured.</p>
        <a class="ss-button-outlined ss-primary" router-link="/">
          Take me home
        </a>
      </div>
    </div>
  );
}

import { jsx } from '../../../../src';

export default function Error404() {
  return (
    <div class={{ container: true }}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you requested does not exist or an error occured.</p>
      <a
        attrs={{
          'id': 'homeBtn',
          'router-link': '/',
        }}
        class={{ button: true }}
      >
        Take me home
      </a>
    </div>
  );
}

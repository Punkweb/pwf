import { http } from './http';
import { jsx } from './jsx';
import { mount } from './mount';
import { router } from './router';
import { render } from './render';
import { logIfDebug } from './util';

const _router = router();
const _http = http(_router.draw);

export { h } from './h';

export const pwf = {
  jsx,
  mount,
  redraw: _router.draw,
  render,
  request: _http.request,
  router: _router,
};

logIfDebug('pwf', 'api', pwf);

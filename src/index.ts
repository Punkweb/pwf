import { http } from './http';
import { jsx } from './jsx';
import { router } from './router';
import { logIfDebug } from './util';

const _router = router();
const _http = http(_router.draw);

export const pwf = {
  jsx,
  redraw: _router.draw,
  request: _http.request,
  router: _router,
};

logIfDebug('pwf', 'api', pwf);

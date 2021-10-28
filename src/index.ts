import {
  init,
  setRedraw,
  attributesModule,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
} from './snabbdom/';
import { http } from './http';
import { render } from './render';
import { router } from './router';

const patch = init([attributesModule, classModule, propsModule, styleModule, eventListenersModule]);
const _render = render(patch);
const _router = router(_render);
const _http = http(_router.draw);
setRedraw(_router.draw);

export { jsx } from './snabbdom/';
export const pwf = {
  buildQueryString: _http.buildQueryString,
  redraw: _router.draw,
  render: _render,
  request: _http.request,
  router: _router,
};

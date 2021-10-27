import { init, attributesModule, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom';
import { http } from './http';
import { render } from './render';
import { router } from './router';

const patch = init([attributesModule, classModule, propsModule, styleModule, eventListenersModule]);
const _render = render(patch);
const _router = router(_render);

export { jsx } from 'snabbdom';
export const pwf = {
  buildQueryString: http.buildQueryString,
  redraw: _router.draw,
  render: _render,
  request: http.request,
  router: _router,
};

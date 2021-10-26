import { init, attributesModule, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom';
import { http } from './http';
import { render } from './render';
import { router } from './router';

const root = document.querySelector('app-root');
let rootContainer: any = null;
if (root) {
  // Clear the root element children
  root.childNodes.forEach((child: ChildNode) => {
    root.removeChild(child);
  });
  // Append a container div to the app-root that will be replaced on route changes
  rootContainer = document.createElement('router-outlet');
  root.appendChild(rootContainer);
} else {
  throw `Improperly configured: No <app-root></app-root> found`;
}
const patch = init([attributesModule, classModule, propsModule, styleModule, eventListenersModule]);
const _render = render(patch);
const _router = router(rootContainer, _render);

export { jsx } from 'snabbdom';
export const pwf = {
  buildQueryString: http.buildQueryString,
  render: _render,
  request: http.request,
  router: _router,
};

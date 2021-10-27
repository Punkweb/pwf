import { init, attributesModule, classModule, propsModule, styleModule, eventListenersModule, h } from 'snabbdom';
import { render } from '../render';
import { router, IRouteMatch } from '../router';

describe('router', () => {
  const patch = init([attributesModule, classModule, propsModule, styleModule, eventListenersModule]);
  let appRoot;
  let appRootContainer;
  let _render;
  let _router: any;

  beforeAll(() => {
    appRoot = document.createElement('app-root');
    appRootContainer = document.createElement('div');
    appRoot.appendChild(appRootContainer);
    document.body.appendChild(appRoot);
    _render = render(patch);
    _router = router(appRootContainer, _render);
  });

  afterAll(() => {
    document.body.childNodes.forEach((cNode) => {
      document.body.removeChild(cNode);
    });
    _render = null;
    _router = null;
  });

  it('should set routes on init', () => {
    function Component() {
      return h('h1', 'Test');
    }
    _router.init([{ path: '/', component: Component }]);
    expect(_router.getRoutes().length).toBe(1);
  });

  it('should match on init', () => {
    function Component() {
      return h('h1', 'Test');
    }
    _router.init([{ path: '/', component: Component }]);
    let match: IRouteMatch = _router.getMatch();
    expect(match.route.component).toBe(Component);
  });
});

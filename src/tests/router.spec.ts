import {
  init,
  attributesModule,
  classModule,
  classNameModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from '../snabbdom/';
import { render } from '../render';
import { router, IRouteMatch } from '../router';

describe('router', () => {
  const patch = init([attributesModule, classModule, classNameModule, propsModule, styleModule, eventListenersModule]);
  let appRoot;
  let _render;
  let _router;

  beforeEach(() => {
    appRoot = document.createElement('app-root');
    document.body.appendChild(appRoot);
    _render = render(patch);
    _router = router(_render);
  });

  afterEach(() => {
    document.body.childNodes.forEach((cNode) => {
      document.body.removeChild(cNode);
    });
    _render = null;
    _router = null;
  });

  it('should init and then match route', () => {
    function Component() {
      return h('h1', 'Test');
    }
    _router.init(appRoot, [{ path: '/', component: Component }]);
    expect(_router.getRoutes().length).toBe(1);
    let match: IRouteMatch = _router.getMatch();
    expect(match.route.component).toBe(Component);
  });

  it('should not allow you to init twice', () => {
    function Component() {
      return h('h1', 'Test');
    }
    try {
      expect(_router.init(appRoot, [{ path: '/', component: Component }])).toThrow(
        'router can only be initialized once'
      );
    } catch (e) {}
  });
});

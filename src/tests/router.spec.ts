import { h } from '../h';
import { router, IRouteMatch } from '../router';

describe('router', () => {
  let appRoot: any;
  let _router: any;

  beforeEach(() => {
    appRoot = document.createElement('app-root');
    document.body.appendChild(appRoot);
    _router = router();
  });

  afterEach(() => {
    document.body.childNodes.forEach((cNode) => {
      document.body.removeChild(cNode);
    });
    _router = null;
  });

  it('should init and then match route', () => {
    function Component() {
      return h('h1', {}, ['Hello World']);
    }
    _router.init(appRoot, [{ path: '/', component: Component }]);
    expect(_router.getRoutes().length).toBe(1);
    let match: IRouteMatch = _router.getMatch();
    expect(match.route.component).toBe(Component);
  });

  it('should not allow you to init twice', () => {
    function Component() {
      return h('h1', {}, ['Hello World']);
    }
    try {
      expect(_router.init(appRoot, [{ path: '/', component: Component }])).toThrow(
        'router can only be initialized once'
      );
    } catch (e) {}
  });
});

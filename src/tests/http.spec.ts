import { init, attributesModule, classModule, propsModule, styleModule, eventListenersModule, h } from '../snabbdom/';
import { http } from '../http';
import { render } from '../render';
import { router } from '../router';

describe('http', () => {
  const patch = init([attributesModule, classModule, propsModule, styleModule, eventListenersModule]);
  let appRoot;
  let _render;
  let _router;
  let _http;

  beforeEach(() => {
    appRoot = document.createElement('app-root');
    document.body.appendChild(appRoot);
    _render = render(patch);
    _router = router(_render);
    _http = http(_router.draw);
  });

  afterEach(() => {
    document.body.childNodes.forEach((cNode) => {
      document.body.removeChild(cNode);
    });
    _render = null;
    _router = null;
    _http = null;
  });

  it('should build a query string from params', () => {
    let params = {
      active: true,
    };
    let expected = '?active=true';

    expect(_http.buildQueryString(params)).toBe(expected);
  });
});

import { http } from '../http';
import { router } from '../router';

describe('http', () => {
  let appRoot: any;
  let _router: any;
  let _http: any;

  beforeEach(() => {
    appRoot = document.createElement('app-root');
    document.body.appendChild(appRoot);
    _router = router();
    _http = http(_router.draw);
  });

  afterEach(() => {
    document.body.childNodes.forEach((cNode) => {
      document.body.removeChild(cNode);
    });
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

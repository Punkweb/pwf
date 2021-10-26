import { http } from '../http';

describe('http', () => {
  it('should build a query string from params', () => {
    let params = {
      active: true,
    };
    let expected = '?active=true';

    expect(http.buildQueryString(params)).toBe(expected);
  });
});

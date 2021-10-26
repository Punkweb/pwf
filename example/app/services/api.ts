import { pwf } from '../../../src';

class Endpoint {
  private endpoint: string = '';

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getHeaders() {
    let headers: any = {};
    // If logged in, add the authorization header
    if (!!localStorage.getItem('uid') && !!localStorage.getItem('token')) {
      headers.Authorization = `Token ${localStorage.getItem('token')}`;
    }
    return headers;
  }

  create(data = null) {
    return pwf.request({
      method: 'POST',
      url: this.createUrl(),
      headers: this.getHeaders(),
      data,
    });
  }

  read(id: number | string, params = null) {
    return pwf.request({
      method: 'GET',
      url: this.createUrl(id),
      headers: this.getHeaders(),
      params,
    });
  }

  list(params = null) {
    return pwf.request({
      method: 'GET',
      url: this.createUrl(),
      headers: this.getHeaders(),
      params,
    });
  }

  update(id: number | string, data = null, put = false) {
    let method = null;
    if (put) {
      method = 'PUT';
    } else {
      method = 'PATCH';
    }
    return pwf.request({
      method,
      url: this.createUrl(id),
      headers: this.getHeaders(),
      data,
    });
  }

  delete(id: number | string) {
    return pwf.request({
      method: 'DELETE',
      url: this.createUrl(id),
      headers: this.getHeaders(),
    });
  }

  listRoute(method: string, route: string, data = null, params = null) {
    return pwf.request({
      method,
      url: `${this.createUrl()}${route}`,
      headers: this.getHeaders(),
      data,
      params,
    });
  }

  detailRoute(method: string, route: string, id: number | string, data = null, params = null) {
    return pwf.request({
      method,
      url: `${this.createUrl()}${id}/${route}`,
      headers: this.getHeaders(),
      data,
      params,
    });
  }

  createUrl(id = null) {
    if (id) {
      return `${process.env.API_URL}${this.endpoint}/${id}/`;
    } else {
      return `${process.env.API_URL}${this.endpoint}/`;
    }
  }
}

export default class API {
  // Auth
  static Register = new Endpoint('register');
  static TokenAuth = new Endpoint('token-auth');
  static Users = new Endpoint('users');
  // Contact
  static ContactForms = new Endpoint('contact_forms');
}

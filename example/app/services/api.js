import { Http } from '../../../lib';

class Endpoint {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getHeaders() {
    let headers = {};
    // If logged in, add the authorization header
    if (!!localStorage.getItem('uid') && !!localStorage.getItem('token')) {
      headers.Authorization = `Token ${localStorage.getItem('token')}`;
    }
    return headers;
  }

  create(data = null) {
    return Http.request({
      method: 'POST',
      url: this.createUrl(),
      headers: this.getHeaders(),
      data,
    });
  }

  read(id, params = null) {
    return Http.request({
      method: 'GET',
      url: this.createUrl(id),
      headers: this.getHeaders(),
      params,
    });
  }

  list(params = null) {
    return Http.request({
      method: 'GET',
      url: this.createUrl(),
      headers: this.getHeaders(),
      params,
    });
  }

  update(id, data = null, put = false) {
    let method = null;
    if (put) {
      method = 'PUT';
    } else {
      method = 'PATCH';
    }
    return Http.request({
      method,
      url: this.createUrl(id),
      headers: this.getHeaders(),
      data,
    });
  }

  delete(id) {
    return Http.request({
      method: 'DELETE',
      url: this.createUrl(id),
      headers: this.getHeaders(),
    });
  }

  listRoute(method, route, data = null, params = null) {
    return Http.request({
      method,
      url: `${this.createUrl()}${route}`,
      headers: this.getHeaders(),
      data,
      params,
    });
  }

  detailRoute(method, route, id, data = null, params = null) {
    return Http.request({
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

class API {
  // Auth
  static Register = new Endpoint('register');
  static TokenAuth = new Endpoint('token-auth');
  static Users = new Endpoint('users');
  // Contact
  static ContactForms = new Endpoint('contact_forms');
  // Music
  static Artists = new Endpoint('artists');
  static Albums = new Endpoint('albums');
  static Audio = new Endpoint('audio');
}

module.exports = API;

import axios from 'axios';

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

  create(data = {}) {
    return axios.request({
      method: 'post',
      url: this.createUrl(),
      headers: this.getHeaders(),
      data,
    });
  }

  read(id, params = {}) {
    return axios.request({
      method: 'get',
      headers: this.getHeaders(),
      url: this.createUrl(id),
      params,
    });
  }

  list(params = {}) {
    return axios.request({
      method: 'get',
      url: this.createUrl(),
      headers: this.getHeaders(),
      params,
    });
  }

  update(id, data = {}, put = false) {
    let method = null;
    if (put) {
      method = 'put';
    } else {
      method = 'patch';
    }
    return axios.request({
      method,
      url: this.createUrl(id),
      headers: this.getHeaders(),
      data,
    });
  }

  delete(id) {
    return axios.request({
      method: 'delete',
      url: this.createUrl(id),
      headers: this.getHeaders(),
    });
  }

  listRoute(method, route, data = {}, params = {}) {
    return axios.request({
      method,
      url: `${this.createUrl()}${route}`,
      headers: this.getHeaders(),
      data,
      params,
    });
  }

  detailRoute(method, route, id, data = {}, params = {}) {
    return m.request({
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
  static Register = new Endpoint('register');
  static TokenAuth = new Endpoint('token-auth');
  static Users = new Endpoint('users');
}

module.exports = API;

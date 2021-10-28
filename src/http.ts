import { logIfDebug } from './util';

export interface IHttpRequest {
  method: string;
  url: string | URL;
  headers?: any;
  params?: any;
  data?: any;
}

export interface IHttpResponse {
  response: ArrayBuffer;
  data: any;
  status: number;
}

export interface IHttpError {
  response: ArrayBuffer;
  error: any;
  status: number;
}

let redraw: any = null;

function buildQueryString(params: any) {
  // Generate query string (?key=value&key=value) from params
  let queryString = params
    ? '?' +
      Object.keys(params)
        .map((key) => {
          return `${key}=${params[key]}`;
        })
        .join('&')
    : '';
  return queryString;
}

function request(config: IHttpRequest) {
  let promise = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      // `this` onreadystatechange callback state
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          // Resolve with IHttpResponse if status is 200-299
          let response: IHttpResponse = {
            response: this.response,
            data: JSON.parse(this.responseText) || this.responseText,
            status: this.status,
          };
          logIfDebug('http', 'OK', response);
          resolve(response);
        } else {
          // Reject with IHttpError if status is not 200-299
          let error: IHttpError = {
            response: this.response,
            error: JSON.parse(this.responseText),
            status: this.status,
          };
          logIfDebug('http', 'ERR', error);
          reject(error);
        }
      }
    };
    let parametizedUrl = `${config.url}${buildQueryString(config.params)}`;
    // Open request to url (with params)
    request.open(config.method, parametizedUrl, true);
    // Append request headers
    request.setRequestHeader('Content-Type', 'application/json');
    if (config.headers) {
      Object.keys(config.headers).forEach((key) => {
        request.setRequestHeader(key, config.headers[key]);
      });
    }
    // Send config.data if method is post, put or patch, otherwise send without body
    if (['POST', 'PUT', 'PATCH'].includes(config.method) && config.data) {
      logIfDebug('http', 'send', parametizedUrl, config.data);
      request.send(JSON.stringify(config.data));
    } else {
      logIfDebug('http', 'send', parametizedUrl, null);
      request.send(null);
    }
  });
  Promise.all([promise]).finally(() => {
    redraw();
  });
  return promise;
}

export const http = (_redraw: any) => {
  redraw = _redraw;
  return {
    buildQueryString,
    request,
  };
};

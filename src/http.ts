interface IHttpRequest {
  method: string;
  url: string | URL;
  headers?: any;
  params?: any;
  data?: any;
}

interface IHttpResponse {
  response: ArrayBuffer;
  data: any;
  status: number;
}

interface IHttpError {
  response: ArrayBuffer;
  error: any;
  status: number;
}

export class Http {
  static request(config: IHttpRequest) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            // Resolve with IHttpResponse if status is 200
            let response: IHttpResponse = {
              response: this.response,
              data: JSON.parse(this.responseText) || this.responseText,
              status: this.status,
            };
            console.log(response);
            resolve(response);
          } else {
            // Reject with IHttpError if status is not 200
            let error: IHttpError = {
              response: this.response,
              error: JSON.parse(this.responseText),
              status: this.status,
            };
            console.log(error);
            reject(error);
          }
        }
      };
      // Generate query string (?key=value&key=value) from config.params
      let queryString = config.params
        ? '?' +
          Object.keys(config.params)
            .map((key) => {
              return `${key}=${config.params[key]}`;
            })
            .join('&')
        : '';
      let parametizedUrl = `${config.url}${queryString}`;
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
        request.send(JSON.stringify(config.data));
      } else {
        request.send(null);
      }
    });
  }
}

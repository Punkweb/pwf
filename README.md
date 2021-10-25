# pwf v0.1.3

Punkweb client-side JavaScript framework for building Single Page Applications

## Capabilities

- App bootstrapping
- Simple SPA router
- Simple json XMLHttpRequests
- [lit-html](https://lit-html.polymer-project.org/) based components

## TODO

- Template engine
- State management
- Better handling of redrawing routes and components

## Get Started

There's an example project using parcel-bundler at `example/`. The example app
could be using a more updated version than what is currently published.

### Installation

```bash
npm install pwf
```

### Setup

In your html include:

```html
<app-root>Loading...</app-root>
```

**Note** `Loading...` is optional

Simple example:

```typescript
import { html, App, Component } from 'pwf';

class MyApp extends Component {
  render() {
    return html`
      <h1>My App</h1>
      <!-- matched route (i.e `Home` at `/`) will be rendered in router-outlet! -->
      <router-outlet></router-outlet>
    `;
  }
}

class Home extends Component {
  render() {
    return html`
      <h3>Home</h3>
    `;
  }
}

new App({
  routes: [{ path: '/', component: Home }],
  bootstrapComponent: MyApp,
});
```

### Router

In JavaScript:

```typescript
import { Router } from 'pwf';

Router.navigate('/login/');
```

In HTML:

```html
<a router-link="/login/">Login</a>
```

### Http

```typescript
import { Http } from 'pwf';

Http.request({
  method: 'GET',
  url: '/users/',
  headers: {
    'Authorization': 'token',
    ...
  },
  params: {
    type: 'active',
    ...
  },
}).then((users) => {
  console.log(users);
}).catch((err) => {
  console.log(err.error);
});

Http.request({
  method: 'POST',
  url: '/contact/',
  data: {
    email: 'john@example.com',
    subject: 'pwf Rocks',
    body: ''
    ...
  },
});
```

#### Http Interfaces

```typescript
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
```

## Development

### Install deps

```bash
npm install
```

### Start example project

```bash
npm start
```

### Build

```
npm run build
```

### Format

```
npm run format
```

### Test

**Note** Tests are not implemented.

```
npm test
```

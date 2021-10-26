# pwf v0.1.3

Punkweb client-side JavaScript framework for building Single Page Applications

## Capabilities

- App bootstrapping
- Simple SPA router
- Simple json XMLHttpRequests
- jsx Virtual DOM provided by [snabbdom](https://github.com/snabbdom/snabbdom)

## TODO

- Change detection

## Get Started

There's an example project using parcel-bundler at `example/`. The example app
could be using a more updated version than what is currently published.

### Installation

```bash
npm install pwf
```

### Setup

In your document body include an `app-root` tag and import your script:

```html
<app-root>Loading...</app-root>

<!-- Example using parcel-bundler -->
<script src="./src/app.jsx"></script>
```

**Note** `Loading...` is optional

### JSX

#### JavaScript

To use JSX in a JavaScript app you'll need to install
`@babel/plugin-transform-react-jsx` and add it to your plugins in `.babelrc`:

```bash
npm install --save-dev @babel/plugin-transform-react-jsx
```

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "jsx"
      }
    ],
    ...
  ],
  ...
}
```

#### TypeScript

To use JSX in a TypeScript app you'll need to set the following
`compilerOptions` in `tsconfig.json`

```json
"compilerOptions": {
  ...
  "jsx": "react",
  "jsxFactory": "jsx"
  ...
},
```

### Simple example

```typescript
import { App, jsx } from 'pwf';

function MyApp() {
  return (
    <h1>My App</h1>
    <router-outlet></router-outlet>
  );
}

function Home() {
  return (
    <h3>Home</h3>
  )
}

new App({
  routes: [{ path: '/', component: Home }],
  bootstrap: MyApp,
});
```

### Router

Navigation in JavaScript:

```typescript
import { Router } from 'pwf';

Router.navigate('/login/');
```

Navigation in HTML:

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
  url: '/login/',
  data: {
    username: 'username',
    password: 'password',
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

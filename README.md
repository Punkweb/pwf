# pwf v0.2.0

Punkweb client-side JavaScript framework for building Single Page Applications

## Capabilities

- Simple SPA router
- Simple json XMLHttpRequests
- Hyperscript or JSX Virtual DOM provided by [snabbdom](https://github.com/snabbdom/snabbdom)

## TODO

- Components w/ Change detection
- Trigger change detection on event callbacks
- Trigger change detection on http callbacks

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

```TSX
import { pwf, jsx } from 'pwf';

function Home() {
  return (
    <h3>Home</h3>
  )
}

function Error404 {
  return (
    <h3>Page Not Found</h3>
  )
}

pwf.router.init([
  routes: [
    { path: '/' component: Home },
    { path: '/:404' component: Error404 },
  ]
]);
```

### Router

Navigation from JavaScript:

```typescript
import { pwf } from 'pwf';

pwf.router.navigate('/login/');
```

Navigation from JSX:

```TSX
<a attrs={{ 'router-link': '/login/' }}>Login</a>
```

### Http

```typescript
import { pwf } from 'pwf';

pwf.request({
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

pwf.request({
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

```
npm test
```

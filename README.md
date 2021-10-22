# pwf v0.1.1

Punkweb client-side JavaScript framework for building Single Page Applications

## Capabilities

- Simple SPA [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) router
- Simple json XMLHttpRequests
- App bootstrapping (Web Components)

## TODO

- Template engine
- Virtual DOM
- State management

## Get Started

There's an example project using parcel-bundler at `example/`. The example app
could be using a more updated version than what is currently published.

### Installation

```bash
npm install pwf
```

In your html include:

```html
<app-root>Loading...</app-root>
```

**Note** `Loading...` is optional

Simple Typescript example:

```typescript
import { App } from 'pwf';

class MyApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>My App</h1>
      <!-- matched route (i.e `Home` at `/`) will be rendered in router-outlet! -->
      <router-outlet></router-outlet>
    `;
  }
}

class Home extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h3>Home</h3>
    `;
  }
}

new App({
  declarations: [
    {
      selector: 'app-my-app',
      class: MyApp,
    },
    {
      selector: 'app-home',
      class: Home,
    },
  ],
  routes: [{ path: '/', selector: 'app-home' }],
  bootstrap: 'app-my-app',
});
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

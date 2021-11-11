import { diff } from './diff';
import { VNode } from './h';
import { mount } from './mount';
import { render } from './render';
import { logIfDebug } from './util';

export interface IRoute {
  path: string;
  component: VNode | Function;
}

export interface IRouteMatch {
  result: RegExpMatchArray;
  route: IRoute;
}

let root: any = null;
let vTree: VNode;
let initialized = false;
let routes: IRoute[] = [];
let match: IRouteMatch = null;

function init(_root: any, _routes: IRoute[]) {
  if (initialized) {
    throw 'router can only be initialized once';
  }
  root = _root;
  routes = _routes;
  logIfDebug('router', 'routes initialized', routes);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      afterDOMLoaded();
    });
  } else {
    afterDOMLoaded();
  }
  matchRoute();
  initialized = true;
}

function afterDOMLoaded() {
  logIfDebug('router', 'add popstate listener');
  window.addEventListener('popstate', () => {
    matchRoute();
  });
  // Add 'router-link' attr click handler
  logIfDebug('router', 'add router-link click listener');
  document.body.addEventListener('click', (e: MouseEvent) => {
    let target = e.target as HTMLElement;
    // Try clicked element
    if (target.matches('[router-link]')) {
      e.preventDefault();
      navigate(target.getAttribute('router-link'));
    } else if (target.parentElement) {
      // Otherwise loop through up to 10 levels of parent elements
      let iterations = 0;
      while (target.parentElement && iterations < 10) {
        if (target.matches('[router-link]')) {
          e.preventDefault();
          navigate(target.getAttribute('router-link'));
          break;
        }
        target = target.parentElement;
        iterations++;
      }
    }
  });
}

function pathToRegex(path: string) {
  return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
}

function potentialMatches() {
  return routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
}

function matchRoute() {
  match = potentialMatches().find((potentialMatch) => {
    return potentialMatch.result !== null;
  });
  if (!match) {
    // Default to first route if no :404
    match = {
      route: routes[0],
      result: [location.pathname],
    };
    logIfDebug('router', 'matchRoute', 'default', match);
  } else {
    logIfDebug('router', 'matchRoute', match);
  }
  draw();
}

function draw() {
  if (!match) {
    return;
  }
  let newVTree = match.route.component;
  if (typeof newVTree === 'function') {
    if (!vTree) {
      logIfDebug('router', 'first draw', newVTree());
      root = mount(root, render(newVTree()));
      vTree = newVTree();
    }
    logIfDebug('router', 'draw', newVTree());
    let patch = diff(vTree, newVTree());
    root = patch(root);
    vTree = newVTree();
  } else {
    if (!vTree) {
      logIfDebug('router', 'first draw', newVTree);
      root = mount(root, render(newVTree));
      vTree = newVTree;
      return;
    }
    logIfDebug('router', 'draw', newVTree);
    let patch = diff(vTree, newVTree);
    root = patch(root);
    vTree = newVTree;
  }
}

function getParams() {
  if (!match) {
    return {};
  }
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);
  let params = Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
  logIfDebug('router', 'getParams', params);
  return params;
}

function navigate(url: string | URL) {
  if (!initialized) {
    throw 'navigate called when router was not initialized';
  }
  logIfDebug('router', 'navigate', url);
  history.pushState(null, null, url);
  matchRoute();
}

function getRoutes() {
  return routes;
}

function getMatch() {
  return match;
}

export const router = () => {
  return {
    init,
    draw,
    getParams,
    navigate,
    getRoutes,
    getMatch,
  };
};

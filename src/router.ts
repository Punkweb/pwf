export interface IRoute {
  path: string;
  component: Function;
}

export interface IRouteMatch {
  result: RegExpMatchArray;
  route: IRoute;
}

let root: any;
let render: Function = null;
let routes: IRoute[] = [];
let match: IRouteMatch = null;

function init(_routes: IRoute[]) {
  routes = _routes;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      afterDOMLoaded();
    });
  } else {
    afterDOMLoaded();
  }
  matchRoute();
}

function afterDOMLoaded() {
  // Add 'router-link' attr click handler
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
  window.addEventListener('popstate', () => {
    matchRoute();
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
    // First try to match a 404 route
    let errRoute = routes.find((route) => {
      return route.path === '/:404';
    });
    if (errRoute) {
      match = {
        route: errRoute,
        result: [location.pathname],
      };
    } else {
      // Default to first route if no :404
      match = {
        route: routes[0],
        result: [location.pathname],
      };
    }
  }
  redraw();
}

function redraw() {
  if (!match) {
    return;
  }
  let component = match.route.component;
  root = render(root, component());
}

function getParams() {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
}

function navigate(url: string | URL) {
  history.pushState(null, null, url);
  matchRoute();
}

export const router = (_root: any, _render: Function) => {
  root = _root;
  render = _render;
  return {
    init,
    redraw,
    getParams,
    navigate,
  };
};

export interface IRoute {
  path: string;
  selector: string;
}

export interface IRouteMatch {
  result: RegExpMatchArray;
  route: IRoute;
}

export class Router {
  static routes: IRoute[];

  static init(routes: IRoute[]) {
    Router.routes = routes;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        Router.afterDOMLoaded();
      });
    } else {
      Router.afterDOMLoaded();
    }
  }

  static afterDOMLoaded() {
    document.body.addEventListener('click', (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      // Try parent element first
      if (target.parentElement && target.parentElement.matches('[router-link]')) {
        e.preventDefault();
        console.log('click link (parent)', target.parentElement.getAttribute('router-link'));
        Router.navigate(target.parentElement.getAttribute('router-link'));
        // Otherwise try element
      } else if (target.matches('[router-link]')) {
        e.preventDefault();
        console.log('click link', target.getAttribute('router-link'));
        Router.navigate(target.getAttribute('router-link'));
      }
    });
    window.addEventListener('popstate', () => {
      Router.matchRoute();
    });
  }

  static pathToRegex(path: string) {
    return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
  }

  static potentialMatches() {
    return Router.routes.map((route) => {
      return {
        route,
        result: location.pathname.match(Router.pathToRegex(route.path)),
      };
    });
  }

  static matchRoute() {
    let match = Router.potentialMatches().find((potentialMatch) => {
      return potentialMatch.result !== null;
    });
    if (!match) {
      // First try to match a 404 route
      let errRoute = Router.routes.find((route) => {
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
          route: Router.routes[0],
          result: [location.pathname],
        };
      }
    }
    console.log('matchRoute', match);
    let selector = match.route.selector;
    let routerOutlet = document.querySelector('router-outlet');
    if (routerOutlet) {
      routerOutlet.innerHTML = `<${selector}></${selector}>`;
    } else {
      console.log('[ERROR] Improperly configured: No <router-outlet></router-outlet> found');
    }
  }

  static getParams(match: IRouteMatch) {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  }

  static navigate(url: string | URL) {
    history.pushState(null, null, url);
    Router.matchRoute();
  }
}

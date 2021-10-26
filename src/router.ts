export interface IRoute {
  path: string;
  component: Function;
}

export interface IRouteMatch {
  result: RegExpMatchArray;
  route: IRoute;
}

export class Router {
  static patch: any;
  static match: IRouteMatch;
  static routes: IRoute[];
  static routerOutlet: any;
  static routerOutletContainer: any;

  static init(patch: any, routes: IRoute[]) {
    Router.patch = patch;
    Router.routes = routes;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        Router.afterDOMLoaded();
      });
    } else {
      Router.afterDOMLoaded();
    }
    // Append a container div to the router-outlet that will be replaced on route changes
    this.routerOutlet = document.querySelector('router-outlet');
    if (this.routerOutlet) {
      this.routerOutletContainer = document.createElement('div');
      this.routerOutlet.appendChild(this.routerOutletContainer);
    } else {
      throw `Improperly configured: No <router-outlet></router-outlet> found`;
    }
  }

  static afterDOMLoaded() {
    // Add 'router-link' attr click handler
    document.body.addEventListener('click', (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      // Try clicked element
      if (target.matches('[router-link]')) {
        e.preventDefault();
        Router.navigate(target.getAttribute('router-link'));
      } else if (target.parentElement) {
        // Otherwise loop through up to 10 levels of parent elements
        let iterations = 0;
        while (target.parentElement && iterations < 10) {
          if (target.matches('[router-link]')) {
            e.preventDefault();
            Router.navigate(target.getAttribute('router-link'));
            break;
          }
          target = target.parentElement;
          iterations++;
        }
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
    this.match = Router.potentialMatches().find((potentialMatch) => {
      return potentialMatch.result !== null;
    });
    if (!this.match) {
      // First try to match a 404 route
      let errRoute = Router.routes.find((route) => {
        return route.path === '/:404';
      });
      if (errRoute) {
        this.match = {
          route: errRoute,
          result: [location.pathname],
        };
      } else {
        // Default to first route if no :404
        this.match = {
          route: Router.routes[0],
          result: [location.pathname],
        };
      }
    }
    Router.renderRouterOutlet();
  }

  static renderRouterOutlet() {
    let component = this.match.route.component;
    this.routerOutletContainer = this.patch(this.routerOutletContainer, component());
  }

  static getParams() {
    const values = this.match.result.slice(1);
    const keys = Array.from(this.match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

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

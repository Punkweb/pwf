export interface IRoute {
  path: string;
  selector: string;
}

export interface IRouteMatch {
  result: RegExpMatchArray;
  route: IRoute;
}

export class Router {
  public routes: IRoute[];
  public match: IRouteMatch;

  constructor(routes: IRoute[]) {
    this.routes = routes;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.afterDOMLoaded();
      });
    } else {
      this.afterDOMLoaded();
    }
  }

  public afterDOMLoaded() {
    // TODO: Fix external links
    document.body.addEventListener('click', (e: MouseEvent) => {
      let anchor = e.target as HTMLAnchorElement;
      if (anchor.matches('[href]')) {
        e.preventDefault();
        this.navigate(anchor.href);
      }
    });
    window.addEventListener('popstate', () => {
      this.matchRoute();
    });
  }

  public pathToRegex(path: string) {
    return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
  }

  public potentialMatches() {
    return this.routes.map((route) => {
      return {
        route,
        result: location.pathname.match(this.pathToRegex(route.path)),
      };
    });
  }

  public matchRoute() {
    this.match = this.potentialMatches().find((potentialMatch) => {
      return potentialMatch.result !== null;
    });
    if (!this.match) {
      this.match = {
        route: this.routes[0],
        result: [location.pathname],
      };
    }
    console.log('matchRoute', this.match);
    let selector = this.match.route.selector;
    if (document.querySelector('router-outlet')) {
      document.querySelector('router-outlet').innerHTML = `<${selector}></${selector}>`;
    }
  }

  public getParams(match: IRouteMatch) {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  }

  public navigate(url: string | URL) {
    history.pushState(null, null, url);
    this.matchRoute();
  }
}

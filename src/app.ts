import { IRoute, Router } from './router';

interface IAppConfig {
  bootstrap: any;
  declarations: any[];
  routes: IRoute[];
}

export class App {
  public root: HTMLElement;
  public router: Router;

  constructor(appConfig: IAppConfig) {
    console.log('appConfig', appConfig);
    this.root = document.querySelector('app-root');
    this.router = new Router(appConfig.routes);
    appConfig.declarations.forEach((declaration) => {
      customElements.define(declaration.selector, declaration.class);
    });
    this.root.innerHTML = `<${appConfig.bootstrap}></${appConfig.bootstrap}>`;
    this.router.matchRoute();
  }
}

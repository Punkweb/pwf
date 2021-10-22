import { IRoute, Router } from './router';

interface AppConfig {
  bootstrap: any;
  declarations: any[];
  routes: IRoute[];
}

export class App {
  public root: HTMLElement;
  public router: Router;

  constructor(appConfig: AppConfig) {
    console.log('appConfig', appConfig);
    this.root = document.querySelector('app-root');
    this.router = new Router(appConfig.routes);
    appConfig.declarations.forEach((declaration) => {
      customElements.define(declaration.selector, declaration);
    });
    this.root.innerHTML = `<${appConfig.bootstrap.selector}></${appConfig.bootstrap.selector}>`;
    this.router.matchRoute();
  }
}

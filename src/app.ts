import { IRoute, Router } from './router';

interface IWebComponentDeclaration {
  selector: string;
  class: any;
}

interface IAppConfig {
  bootstrap: string;
  declarations: IWebComponentDeclaration[];
  routes: IRoute[];
}

export class App {
  public root: HTMLElement;

  constructor(appConfig: IAppConfig) {
    this.root = document.querySelector('app-root');
    Router.init(appConfig.routes);
    appConfig.declarations.forEach((declaration) => {
      customElements.define(declaration.selector, declaration.class);
    });
    this.root.innerHTML = `<${appConfig.bootstrap}></${appConfig.bootstrap}>`;
    Router.matchRoute();
  }
}

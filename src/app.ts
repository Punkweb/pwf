import { render } from 'lit-html';
import { Component } from './component';
import { IRoute, Router } from './router';

interface IAppConfig {
  bootstrapComponent: any;
  routes: IRoute[];
}

export class App {
  static bootstrapComponentInstance: Component;
  public root: HTMLElement;

  constructor(appConfig: IAppConfig) {
    console.log(appConfig);
    this.root = document.querySelector('app-root');
    Router.init(appConfig.routes);
    App.bootstrapComponentInstance = new appConfig.bootstrapComponent();
    render(App.bootstrapComponentInstance.render(), document.body);
    Router.matchRoute();
  }

  static redraw() {
    render(App.bootstrapComponentInstance.render(), document.body);
    Router.renderRouterOutlet();
  }
}

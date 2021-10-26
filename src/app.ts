import { IRoute, Router } from './router';
import { init, attributesModule, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom';

interface IAppConfig {
  bootstrap: Function;
  routes: IRoute[];
}

export class App {
  public patch: any;
  public root: any;

  constructor(appConfig: IAppConfig) {
    console.log(appConfig);
    this.patch = init([attributesModule, classModule, propsModule, styleModule, eventListenersModule]);
    this.root = document.querySelector('app-root');
    this.root = this.patch(this.root, appConfig.bootstrap());
    Router.init(this.patch, appConfig.routes);
    Router.matchRoute();
  }
}

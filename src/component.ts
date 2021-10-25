import { Subject } from 'rxjs';
import { TemplateResult } from 'lit-html';

export abstract class Component {
  constructor() {
    if (this.init) {
      this.init();
    }
  }

  abstract init(): void;

  abstract afterRender(): void;

  abstract render(): TemplateResult;
}

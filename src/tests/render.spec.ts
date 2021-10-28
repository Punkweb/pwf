import { init, attributesModule, classModule, propsModule, styleModule, eventListenersModule, h } from '../snabbdom/';
import { render } from '../render';

describe('render', () => {
  const patch = init([attributesModule, classModule, propsModule, styleModule, eventListenersModule]);
  const _render = render(patch);

  it('should render hyperscript h1 to app-root', () => {
    let appRoot = document.createElement('app-root');
    document.body.appendChild(appRoot);
    function Component() {
      return h('h1', 'Test');
    }

    appRoot = _render(appRoot, Component);

    expect(appRoot).toBeTruthy();
    expect(appRoot).toBe(Component);
  });
});

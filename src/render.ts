import { h } from 'snabbdom';
import { DEBUG, logIfDebug } from './util';

export const render = (_patch: any) => {
  let renderCount = 0;
  return (root: any, component: any) => {
    let c = component;
    if (!c) {
      logIfDebug('render', 'clear');
      c = h('!');
    } else {
      if (DEBUG) {
        renderCount++;
      }
      logIfDebug('render', renderCount, root, c);
    }
    let patch = _patch(root, c);
    return patch;
  };
};

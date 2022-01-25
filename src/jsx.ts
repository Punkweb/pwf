import { h, VNode } from './h';

function element(tag: string | Function, props: any, ...children: Array<string | VNode>): VNode {
  if (typeof tag === 'function') {
    return tag(props, children);
  }
  return h(tag, props || {}, children);
}

function fragment(props: any, ...children: any) {
  return children.flat();
}

declare global {
  namespace JSX {
    type Element = any;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export const jsx = {
  element,
  fragment,
};

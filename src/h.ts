export interface VNode {
  tag: string;
  props: any;
  children: Array<VNode | string>;
}

function createVNode(tag: string, props = {}, children: Array<VNode | string> = []): VNode {
  return {
    tag,
    props,
    children,
  };
}

export function h(tag: string | Function, props = {}, children: Array<VNode | string> = []) {
  if (typeof tag === 'function') {
    return tag(props, children);
  }
  return createVNode(tag, props, children);
}

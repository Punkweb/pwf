import { VNode } from './h';

function renderText(vNode: string) {
  return document.createTextNode(vNode);
}

function renderElement(vNode: VNode) {
  const element = document.createElement(vNode.tag);

  // Attributes
  if (vNode.props) {
    for (const [key, value] of Object.entries(vNode.props)) {
      if (key.startsWith('on') && key.toLowerCase() in window) {
        element.addEventListener(key.toLowerCase().substr(2), value as any);
      } else {
        element.setAttribute(key, value as string);
      }
    }
  }

  // Children
  if (vNode.children) {
    for (const child of vNode.children.flat()) {
      element.appendChild(render(child));
    }
  }

  return element;
}

function renderArray(vNode: Array<VNode>) {
  return vNode.flat().map((vnode) => {
    return render(vnode);
  });
}

export function render(vNode: VNode | string): any {
  if (Array.isArray(vNode)) {
    return renderArray(vNode);
  }
  if (typeof vNode === 'string') {
    return renderText(vNode);
  }
  return renderElement(vNode);
}

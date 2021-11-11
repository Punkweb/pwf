import { VNode } from './h';

function renderText(vNode: string) {
  return document.createTextNode(vNode);
}

function renderElement(vNode: VNode) {
  const element = document.createElement(vNode.tag);

  // Attributes
  // if (vNode.props) {
  //   for (const [key, value] of Object.entries(vNode.props)) {
  //     element.setAttribute(key, value as string);
  //   }
  // }

  // Children
  if (vNode.children) {
    for (const child of vNode.children) {
      element.appendChild(render(child));
    }
  }

  return element;
}

export function render(vNode: VNode | string) {
  if (typeof vNode === 'string') {
    return renderText(vNode);
  }
  return renderElement(vNode);
}

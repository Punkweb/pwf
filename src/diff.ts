import { VNode } from './h';
import { render } from './render';

function diffProps(oldAttrs: any, newAttrs: any) {
  const patches: any = [];

  for (const [key, value] of Object.entries(newAttrs)) {
    patches.push((node: Element) => {
      if (key.startsWith('on') && key.toLowerCase() in window) {
        // console.log(key);
        let listener = value as any;
        node.addEventListener(key.toLowerCase().substr(2), listener);
      } else {
        console.log(key);
        node.setAttribute(key, value as string);
      }
      return node;
    });
  }

  for (const key in oldAttrs) {
    if (!(key in newAttrs)) {
      patches.push((node: Element) => {
        node.removeAttribute(key);
        return node;
      });
    }
  }

  return (node: Element) => {
    for (const patch of patches) {
      patch(node);
    }
    return node;
  };
}

function zip(xs: any, ys: any) {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
}

function diffChildren(oldVChildren: Array<string | VNode>, newVChildren: Array<string | VNode>) {
  const childPatches: any = [];
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatches: any = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push((node: Element) => {
      node.appendChild(render(additionalVChild));
      return node;
    });
  }
  return (parent: Element) => {
    for (const [patch, child] of zip(childPatches, parent.childNodes)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch(parent);
    }
    return parent;
  };
}

export function diff(oldVTree: string | VNode, newVTree: string | VNode) {
  if (newVTree === undefined) {
    return (node: Element): undefined => {
      node.remove();
      return undefined;
    };
  }

  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return (node: Element) => {
        const newNode = render(newVTree);
        node.replaceWith(newNode);
        return newNode;
      };
    } else {
      return (node: Element) => node;
    }
  }

  if (oldVTree.tag !== newVTree.tag) {
    return (node: Element) => {
      const newNode = render(newVTree);
      node.replaceWith(newNode);
      return newNode;
    };
  }

  const patchAttrs = diffProps(oldVTree.props, newVTree.props);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);

  return (node: Element) => {
    patchAttrs(node);
    patchChildren(node);
    return node;
  };
}

function appendChild(parent: any, child: any) {
  if (Array.isArray(child)) {
    child.forEach((nestedChild) => appendChild(parent, nestedChild));
  } else {
    parent.appendChild(child.nodeType ? child : document.createTextNode(child));
  }
}

function element(tag: any, props: any, ...children: any) {
  if (typeof tag === 'function') {
    return tag(props, children);
  }
  const element = document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name === 'className') {
      element.className = value;
    } else if (name.startsWith('on') && name.toLowerCase() in window) {
      // Add event listeners
      element.addEventListener(name.toLowerCase().substr(2), value);
    } else {
      // Set attributes
      element.setAttribute(name, value.toString());
    }
  });

  children.forEach((child: any) => {
    appendChild(element, child);
  });
  return element;
}

function fragment(props: any, ...children: any) {
  return children;
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

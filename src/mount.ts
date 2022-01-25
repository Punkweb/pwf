export function mount(root: HTMLElement, element: any) {
  if (Array.isArray(element)) {
    root.replaceChildren(...element);
    return element;
  }
  root.replaceChildren(element);
  return element;
}

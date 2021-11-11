export function mount(root: any, node: any) {
  root.replaceWith(node);
  return node;
}

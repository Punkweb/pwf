export const render = (_patch: any) => {
  return (root: any, component: Function) => {
    return _patch(root, component);
  };
};

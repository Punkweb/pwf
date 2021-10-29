import { VNode, VNodeData } from '../vnode';
import { Module } from './module';

function updateClassName(oldVnode: VNode, vnode: VNode): void {
  const elm: Element = vnode.elm as Element;
  let oldClassName = (oldVnode.data as VNodeData).className;
  let klassName = (vnode.data as VNodeData).className;

  if (!oldClassName && !klassName) return;
  if (oldClassName === klassName) return;

  oldClassName = oldClassName || '';
  klassName = klassName || '';

  let oldClassNameSplit = oldClassName.split(' ');
  let klassNameSplit = klassName.split(' ');

  for (let idx in oldClassNameSplit) {
    if (oldClassNameSplit[idx]) {
      elm.classList.remove(oldClassNameSplit[idx]);
    }
  }
  for (let idx in klassNameSplit) {
    if (klassNameSplit[idx]) {
      elm.classList.add(klassNameSplit[idx]);
    }
  }
}

export const classNameModule: Module = { create: updateClassName, update: updateClassName };

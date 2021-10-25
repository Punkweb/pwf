// Polyfill for extending HTMLElement
import '@webcomponents/custom-elements/src/native-shim';
// Polyfill for supporting browsers that do not know custom elements
import '@webcomponents/custom-elements/custom-elements.min';

export { html, render } from 'lit-html';

export * from './app';
export * from './component';
export * from './http';
export * from './router';

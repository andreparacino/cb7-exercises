export const createEl = (el, props = {}) => {
  const element = document.createElement(el);
  Object.assign(element, props);
  return element;
};

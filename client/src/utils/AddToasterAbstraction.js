import lodash from 'lodash';

export function addToast(...args) {
  const add = lodash.get(window, '__react_toast_provider.current.add');
  if (!add) {
    console.error('Some helpful error.');
    return;
  }

  add(...args);
}

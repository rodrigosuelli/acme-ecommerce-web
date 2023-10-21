import { useLocalStorage } from '@uidotdev/usehooks';

/**
 * @param {string} key
 * @param {any} initialValue
 */
export default function useLocalStorageCustom(key, initialValue) {
  let state;
  let setState;

  try {
    [state, setState] = useLocalStorage(key, initialValue);
  } catch (error) {
    // Reset value to initial if localStorage Cart has invalid JSON value
    localStorage.setItem(key, initialValue);
  }

  return [state, setState];
}

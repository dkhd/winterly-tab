const getStorageItem = (key) => {
  return localStorage.getItem(key);
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

export { getStorageItem, setStorageItem };

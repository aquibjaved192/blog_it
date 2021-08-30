export const saveLocalStorage = (key, value) => {
 typeof window !== 'undefined' &&
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
 return typeof window !== 'undefined' && JSON.parse(localStorage.getItem(key));
};

export const removeLocalStorage = (key) => {
 typeof window !== 'undefined' && localStorage.removeItem(key);
};

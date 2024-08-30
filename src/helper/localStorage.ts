export const getLocalStorage = <R>(key: string): R | null => {
    if (typeof localStorage === "undefined") return null;
  
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  };
  
  export const setLocalStorage = <T>(key: string, value: T) => {
    if (typeof localStorage === "undefined") return null;
  
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const removeLocalStorage = (key: string) => {
    if (typeof localStorage === "undefined") return;
  
    localStorage.removeItem(key);
  };
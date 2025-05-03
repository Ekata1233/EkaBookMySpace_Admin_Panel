// src/utils/auth.ts

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
export const login = (username: string, password: string): boolean => {
  if (username === 'BookMySpace' && password === 'BookMySpace123') {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};
export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
};

import Api from './api';

export const TOKEN_KEY = "@myOrder-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getRole = () => {

}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
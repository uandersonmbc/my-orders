import Api from './api';

export const TOKEN_KEY = "@myOrder-Token";
export const ROLE_KEY = "@myOrder-Role";
export const USER_KEY = "@myOrder-User";

export const isAuthenticated = () => {
    return ((localStorage.getItem(TOKEN_KEY) !== null) && (localStorage.getItem(ROLE_KEY) !== null));
}

export const checkRole = async () => {
    try {
        const user = await Api.get('/user');
        return (localStorage.getItem(ROLE_KEY) === user.data.role[0]);
    } catch (error) {
        return false;
    }
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRole = () => localStorage.getItem(ROLE_KEY) ? localStorage.getItem(ROLE_KEY) : '';
export const getUser = () => localStorage.getItem(USER_KEY);

export const userName = name => {
    localStorage.setItem(USER_KEY, name);
}

export const roleUser = role => {
    localStorage.setItem(ROLE_KEY, role);
}

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_KEY);
};
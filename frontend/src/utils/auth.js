// Save token
export const setToken = (token) => localStorage.setItem("token", token);

// Get token
export const getToken = () => localStorage.getItem("token");

// Remove token (sign out)
export const removeToken = () => localStorage.removeItem("token");

// UK English comments: Simple client-side auth for demo purposes. Replace with secure auth in prod.
const TOKEN_KEY = 'si_token';
const USER_KEY = 'si_user';

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function loadToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loadUser() {
  const s = localStorage.getItem(USER_KEY);
  return s ? JSON.parse(s) : null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = '/login';
}

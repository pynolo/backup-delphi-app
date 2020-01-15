import Cookies from "universal-cookie";

export function setUsername(username) {
  const cookies = new Cookies();
  cookies.set("username", { username }, { path: "/" });
}

export function getUsername() {
  const cookies = new Cookies();
  return cookies.get("username");
}

export function removeUsername() {
  const cookies = new Cookies();
  return cookies.remove("username");
}

export function setRole(role) {
  const cookies = new Cookies();
  cookies.set("role", { role }, { path: "/" });
}

export function getRole() {
  const cookies = new Cookies();
  return cookies.get("role");
}

export function removeRole() {
  const cookies = new Cookies();
  return cookies.remove("role");
}

export function isLoggedIn() {
  return this.getUsername() != null;
}

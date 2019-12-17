import Cookies from "universal-cookie";

export function setUsername(username) {
  const cookies = new Cookies();
  cookies.set("username", { username }, { path: "/" });
  console.log("username: " + cookies.get("username"));
}

export function getUsername() {
  const cookies = new Cookies();
  return cookies.get("username");
}

export function removeUsername() {
  const cookies = new Cookies();
  return cookies.remove("username");
}

export function isLoggedIn() {
  return this.getUsername() != null;
}

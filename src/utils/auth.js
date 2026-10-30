export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("currentStudent");
}

export function handleUnauthorized(response) {
  if (response.status === 401) {
    logout();
    window.location.href = "/";
    return true;
  }

  return false;
}
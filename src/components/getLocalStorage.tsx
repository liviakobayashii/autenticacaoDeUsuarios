export function getUsers() {
  const storedUsers = localStorage.getItem("@Users");

  return storedUsers ? JSON.parse(storedUsers) : [];
}

export function getLoggedUser() {
  const storedUser = localStorage.getItem("@LoggedUser");

  return storedUser ? JSON.parse(storedUser) : null;
}

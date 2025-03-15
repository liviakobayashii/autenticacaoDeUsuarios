export function getUsers() {
  const storedUsers = localStorage.getItem("@Users");

  return storedUsers ? JSON.parse(storedUsers) : [];
}

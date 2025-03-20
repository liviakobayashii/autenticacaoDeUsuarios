export function getLoggedUser() {
  if (typeof window === "undefined") return null;
  const storedUser = localStorage.getItem("@LoggedUser");

  return storedUser ? JSON.parse(storedUser) : null;
}

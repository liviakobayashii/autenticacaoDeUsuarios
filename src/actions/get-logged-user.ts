"use client";

export function getLoggedUser() {
  const storedUser = localStorage.getItem("@LoggedUser");

  return storedUser ? JSON.parse(storedUser) : null;
}

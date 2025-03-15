export default function LoginUser(user: any) {
  localStorage.setItem("@LoggedUser", JSON.stringify(user));
}

export default function SaveUser(user: any) {
  localStorage.setItem("@Users", JSON.stringify(user));
}

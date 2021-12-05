export default function logoutButton() {
  const button = document.querySelector("#logout");

  if (button) {
    button.onclick = function () {
      const doLogout = confirm("Are you sure you want to log out?");

      if (doLogout) {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");

        location.href = "/";
      }
    };
  }
}

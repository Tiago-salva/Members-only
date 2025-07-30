document.addEventListener("DOMContentLoaded", () => {
  const isAuthenticated =
    document.querySelector("header").dataset.authenticated === "true";

  const profileButton = document.getElementById("profile-button");
  const profileInfoDiv = document.querySelector(".profile-information");

  profileButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      profileInfoDiv.classList.toggle("open");
    } else {
      window.location.href = "/log-in";
    }
  });
});

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

document.getElementById("logout-btn").addEventListener("click", logout);
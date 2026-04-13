function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
}

document.getElementById("logout-btn").addEventListener("click", logout);
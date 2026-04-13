document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u =>
        u.username.toLowerCase() === username &&
        u.password === password
    );

    if (!user) {
        alert("Account not found. Please check your data or sign up first.");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    
    localStorage.setItem("userRole", user.type);   // 'admin' or 'user'

    alert("Welcome back " + user.username + "!");

    window.location.href = "books.html";
});
// ================= SIGN UP =================
function validateSignup() {

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;
    let type = document.getElementById("type").value;

    // Validation
    if (username === "" || email === "" || password === "" || confirm === "") {
        alert("Please fill all fields");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return false;
    }

    if (password !== confirm) {
        alert("Passwords do not match");
        return false;
    }

    if (type === "") {
        alert("Please select user type");
        return false;
    }

    let newUser = { username, email, password, type };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if exists
    let exists = users.some(user => user.email === email);

    if (exists) {
        alert("You already have an account! Redirecting to login...");
        window.location.href = "login.html";
        return false;
    }

    // Save user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Registered successfully!");

    // Go to profile
    window.location.href = "profile.html";

    return false;
}



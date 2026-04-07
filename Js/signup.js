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

    // 🔥 Save current user (for profile)
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Registered successfully!");

    // Go to profile
    window.location.href = "profile.html";

    return false;
}

// ================= LOAD PROFILE =================
function loadProfile() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Fill inputs
    document.getElementById("p-username").value = currentUser.username;
    document.getElementById("p-email").value = currentUser.email;
    document.getElementById("p-password").value = currentUser.password;
    document.getElementById("p-type").value = currentUser.type;

    // Show name
    let welcome = document.getElementById("welcome-name");
    if (welcome) {
        welcome.innerText = currentUser.username;
    }
}


// ================= UPDATE PROFILE =================
function updateProfile() {

    let username = document.getElementById("p-username").value.trim();
    let email = document.getElementById("p-email").value.trim();
    let password = document.getElementById("p-password").value;
    let type = document.getElementById("p-type").value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let index = users.findIndex(user => user.email === currentUser.email);

    if (index !== -1) {

        users[index] = { username, email, password, type };

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(users[index]));

        alert("Profile updated successfully!");
    } else {
        alert("Error updating profile");
    }
}




// ================= AUTO LOAD =================
window.onload = function () {
    if (document.getElementById("p-username")) {
        loadProfile();
    }
};

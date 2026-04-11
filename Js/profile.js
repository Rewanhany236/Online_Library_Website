let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
}

// 
function loadProfile() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.id === currentUser.id);

    if (!user) return;

    document.getElementById("welcome").innerText = "Welcome " + user.name;
    document.getElementById("username").innerText = user.name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("role").innerText = user.role;
}


function changePassword() {
    let newPass = document.getElementById("newPassword").value.trim();

    if (newPass.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let index = users.findIndex(u => u.id === currentUser.id);

    if (index === -1) {
        alert("User not found");
        return;
    }

    users[index].password = newPass;

    localStorage.setItem("users", JSON.stringify(users));

    alert("Password updated successfully!");

    document.getElementById("newPassword").value = "";
}

// 

loadProfile();

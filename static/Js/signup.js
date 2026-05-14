// client-side validation only, actual signup is handled by djange via post
document.addEventListener("DOMContentLoaded", () => {

    const form     = document.querySelector(".signup-form");
    const password = document.getElementById("password");
    const confirm  = document.getElementById("confirm");

    form.addEventListener("submit", (e) => {

        const username = document.getElementById("username").value.trim();
        const email    = document.getElementById("email").value.trim();

        if (!username || !email || !password.value || !confirm.value) {
            e.preventDefault();
            alert("Please fill all fields.");
            return;
        }

        if (password.value.length < 8) {
            e.preventDefault();
            alert("Password must be at least 8 characters.");
            return;
        }

        if (password.value !== confirm.value) {
            e.preventDefault();
            alert("Passwords do not match.");
            return;
        }
        
    });
});
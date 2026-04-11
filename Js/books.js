document.addEventListener("DOMContentLoaded", function () {

    // 📌 نجيب نوع المستخدم
    const userRole = localStorage.getItem("role");

    console.log("Current Role:", userRole);

    // 📌 عناصر الناف بار
    const adminLinks = document.getElementById("admin-links");
    const authLinks = document.getElementById("auth-links");
    const profileLinks = document.getElementById("profile-links");


    if (userRole === "admin") {
        if (adminLinks) adminLinks.style.display = "inline";
        if (profileLinks) profileLinks.style.display = "inline";
        if (authLinks) authLinks.style.display = "none";
    } 

    else if (userRole === "user") {
        if (profileLinks) profileLinks.style.display = "inline";
        if (authLinks) authLinks.style.display = "none";
    } 
    else {
        if (authLinks) authLinks.style.display = "inline";
    }


    const adminButtons = document.querySelectorAll(".admin-only");
    const userButtons = document.querySelectorAll(".user-only");

   
    if (userRole === "admin") {
        adminButtons.forEach(el => {
            el.style.display = "block";
        });
    }

    if (userRole === "user") {
        userButtons.forEach(btn => {
            btn.style.display = "inline-block";
        });
    }

  
    userButtons.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            alert("The book is borrowed successfully");
        });
    });

});

function deleteBook(id) {
    const confirmDelete = confirm("Are you certain that you want to delete this book?");

    if (confirmDelete) {
        alert("Book with id: " + id +" is deleted successfully " );
    }
}
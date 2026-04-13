// js/nav.js

function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userRole = currentUser?.type || null;

    const adminLinks = document.getElementById('admin-links');
    const authLinks = document.getElementById('auth-links');
    const profileLinks = document.getElementById('profile-links');

    if (userRole === 'admin') {
        if (adminLinks) adminLinks.style.display = 'inline';
        if (profileLinks) profileLinks.style.display = 'inline';
        if (authLinks) authLinks.style.display = 'none';
    } else if (userRole === 'user') {
        if (profileLinks) profileLinks.style.display = 'inline';
        if (authLinks) authLinks.style.display = 'none';
        if (adminLinks) adminLinks.style.display = 'none';
    } else {
        // guest
        if (authLinks) authLinks.style.display = 'inline';
        if (adminLinks) adminLinks.style.display = 'none';
        if (profileLinks) profileLinks.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function attachLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbar);
    document.addEventListener('DOMContentLoaded', attachLogout);
} else {
    updateNavbar();
    attachLogout();
}
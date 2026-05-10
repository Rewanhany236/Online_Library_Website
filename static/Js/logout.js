document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            //get CSRF token from cookie
            function getCSRFToken() {
                let cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i].trim();
                        if (cookie.substring(0, 10) === 'csrftoken=') {
                            cookieValue = decodeURIComponent(cookie.substring(10));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            try {
                const response = await fetch('/accounts/logout/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCSRFToken(),
                    },
                });

                // Redirect to home after logout
                window.location.href = '/';
            } catch (error) {
                console.error('Logout error:', error);
                window.location.href = '/';
            }
        });
    }
});
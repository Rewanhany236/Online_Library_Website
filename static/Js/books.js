//csrf token 
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

document.addEventListener("DOMContentLoaded", () => {

    //Search
    
    const searchInput = document.getElementById("searchInput");
    const searchBtn   = document.getElementById("searchBtn");

    function filterBooks(text) {
        const query = text.toLowerCase().trim();

        // If empty query show all cards
        if (query === "") {
            document.querySelectorAll(".book-card").forEach(card => {
                card.style.display = "";
            });
            return;
        }

        document.querySelectorAll(".book-card").forEach(card => {
            const title  = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const author = card.querySelector("p")?.textContent.toLowerCase() || "";
            card.style.display = (title.includes(query) || author.includes(query)) ? "" : "none";
        });
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => filterBooks(searchInput.value));
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") filterBooks(searchInput.value);
        });
    }

    //Borrow
    document.querySelectorAll(".borrow-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const bookId = btn.getAttribute("data-id");
            try {
                const response = await fetch(`/api/books/${bookId}/borrow/`, {
                    method: "POST",
                    headers: { "X-CSRFToken": getCSRFToken() },
                });
                const data = await response.json();
                if (response.ok) {
                    const card = btn.closest(".book-card");
                    const statusEl = card.querySelector(".status");
                    statusEl.textContent = "Borrowed";
                    statusEl.classList.replace("status-available", "status-borrowed");
                    btn.remove();
                } else {
                    alert(data.error || "Could not borrow book.");
                }
            } catch (err) {
                console.error("Borrow error:", err);
                alert("Network error. Could not borrow book.");
            }
        });
    });

    //Delete
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const bookId = btn.getAttribute("data-id");
            if (!confirm("Are you sure you want to delete this book?")) return;
            try {
                const response = await fetch(`/api/books/${bookId}/delete/`, {
                    method: "DELETE",
                    headers: { "X-CSRFToken": getCSRFToken() },
                });
                if (response.ok) {
                    btn.closest(".book-card").remove();
                } else {
                    const data = await response.json();
                    alert(data.error || "Could not delete book.");
                }
            } catch (err) {
                console.error("Delete error:", err);
                alert("Network error. Could not delete book.");
            }
        });
    });

});
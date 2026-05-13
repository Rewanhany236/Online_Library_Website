// Search filter
document.getElementById('borrowedSearchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.book-card').forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
    });
});

// CSRF helper
function getCSRFToken() {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
}

// Return book
document.querySelectorAll('.return-btn').forEach(btn => {
    btn.addEventListener('click', async function () {
        const bookId = this.dataset.id;
        if (!confirm('Return this book?')) return;

        const res = await fetch(`/api/books/${bookId}/return/`, {
            method: 'POST',
            headers: { 'X-CSRFToken': getCSRFToken() },
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message || 'Returned successfully.');
            location.reload();
        } else {
            alert(data.error || 'Failed to return.');
        }
    });
});
// ==================== Core storage functions ====================
function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

function initLocalStorage() {
    if (!localStorage.getItem("books")) {
        // Use the global 'books' array from books-data.js (loaded before this script)
        if (typeof books !== 'undefined' && Array.isArray(books)) {
            localStorage.setItem("books", JSON.stringify(books));
        } else {
            localStorage.setItem("books", JSON.stringify([]));
        }
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ==================== Borrow & Delete ====================
function borrowBook(bookId) {
    let books = getBooks();
    const book = books.find(b => b.id == bookId);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("You must be logged in to borrow a book.");
        return;
    }

    if (book && book.status && book.status.toLowerCase() === "available") {
        book.status = "Borrowed";
        book.borrowedBy = currentUser.username;   // ← this is critical
        book.borrowedDate = new Date().toISOString().slice(0,10);
        saveBooks(books);
        alert(`You have borrowed "${book.title}".`);
        if (typeof renderBooks === 'function') renderBooks();
    } else {
        alert("This book is not available for borrowing.");
    }
}
window.deleteBook = function(bookId) {
    const confirmDelete = confirm("Are you certain that you want to delete this book?");
    if (confirmDelete) {
        let books = getBooks();
        const newBooks = books.filter(b => b.id != bookId);
        saveBooks(newBooks);
        alert("Book deleted successfully.");
        renderBooks();
    }
};

// ==================== Render book cards ====================
function renderBooks(filterText = '') {
    const books = getBooks();
    const container = document.getElementById("booksContainer");
    if (!container) return;

    let filteredBooks = books;
    if (filterText.trim() !== '') {
        const lowerFilter = filterText.toLowerCase();
        filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(lowerFilter) ||
            book.author.toLowerCase().includes(lowerFilter)
        );
    }

    if (filteredBooks.length === 0) {
        container.innerHTML = '<p style="text-align:center;">No books available. <a href="addbook.html">Add one</a>.</p>';
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userRole = currentUser?.type || "guest";

    let html = '';
    filteredBooks.forEach(book => {
        const status = book.status || 'Available';
        const statusClass = status.toLowerCase() === 'available' ? 'status-available' : 'status-borrowed';

        let borrowButton = '';
        if (userRole === 'user' && status.toLowerCase() === 'available') {
            borrowButton = `<button class="user-only btn borrow-btn" data-id="${book.id}">Borrow</button>`;
        }

        let adminButtons = '';
        if (userRole === 'admin') {
            adminButtons = `
                <div class="admin-only">
                    <a href="editbook.html?id=${book.id}"><button class="btn edit-btn">Edit</button></a>
                    <button class="btn delete-btn" onclick="deleteBook(${book.id})">Delete</button>
                </div>
            `;
        }

        const imageUrl = book.imageUrl || 'images/default-book.jpg';

        html += `
            <div class="book-card" data-id="${book.id}">
                <a href="books-details.html?id=${book.id}">
                    <img src="${imageUrl}" alt="${book.title}" class="book-img" onerror="this.src='images/default-book.jpg'">
                </a>
                <h3>${escapeHtml(book.title)}</h3>
                <p>By ${escapeHtml(book.author)}</p>
                <p class="status ${statusClass}">${status}</p>
                <div class="actions">
                    ${borrowButton}
                    ${adminButtons}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Attach borrow events to dynamically created buttons
    document.querySelectorAll('.borrow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const bookId = parseInt(btn.dataset.id);
            borrowBook(bookId);
        });
    });
}

// ==================== Initialise page ====================
document.addEventListener("DOMContentLoaded", function () {
    initLocalStorage();
    renderBooks();

    // Search functionality (if search elements exist)
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => renderBooks(searchInput.value));
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") renderBooks(searchInput.value);
        });
    }

    // Role‑based button visibility for static elements (if any)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userRole = currentUser?.type;
    const adminButtons = document.querySelectorAll(".admin-only");
    const userButtons = document.querySelectorAll(".user-only");

    if (userRole === "admin") {
        adminButtons.forEach(el => el.style.display = "block");
    }
    if (userRole === "user") {
        userButtons.forEach(btn => btn.style.display = "inline-block");
    }
});
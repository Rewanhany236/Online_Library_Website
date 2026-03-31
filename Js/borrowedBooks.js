function displayBorrowedBooks(bookList = null) {
    const container = document.getElementById("borrowedBooksContainer");
    if (!container) return;

    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    if (bookList) {
        borrowedBooks = bookList;
    }

    container.innerHTML = "";

    if (borrowedBooks.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; font-size: 18px;">No borrowed books yet.</p>
        `;
        return;
    }

    borrowedBooks.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
            <img src="${book.imageUrl}" alt="${book.title}" class="book-img">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p><strong>Borrow Date:</strong> ${book.borrowDate}</p>
            <div class="actions">
                <button class="btn" disabled>Borrowed</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function setupBorrowedSearch() {
    const searchInput = document.getElementById("borrowedSearchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();

        let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

        const filteredBooks = borrowedBooks.filter(book =>
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue)
        );

        displayBorrowedBooks(filteredBooks);
    });
}

displayBorrowedBooks();
setupBorrowedSearch();

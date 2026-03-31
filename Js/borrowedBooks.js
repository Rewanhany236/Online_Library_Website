function displayBorrowedBooks() {
    const tableBody = document.getElementById("borrowedBooksTable");
    if (!tableBody) return;

    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    tableBody.innerHTML = "";

    if (borrowedBooks.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5">No borrowed books yet.</td>
            </tr>
        `;
        return;
    }

    borrowedBooks.forEach(book => {
        const row = `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.borrowDate}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

displayBorrowedBooks();
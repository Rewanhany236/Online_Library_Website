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
        book.borrowedBy = currentUser.username;   // store who borrowed it
        book.borrowedDate = new Date().toISOString().slice(0,10); // optional
        saveBooks(books);
        alert(`You have borrowed "${book.title}".`);
        renderBooks();  // refresh the listing
    } else {
        alert("This book is not available for borrowing.");
    }
}
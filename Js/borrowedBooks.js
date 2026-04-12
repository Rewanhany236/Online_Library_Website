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

function displayBorrowedBooks() {
    const container = document.getElementById("borrowedBooksContainer");
    if (!container) return;

    // 1. هنجيب كل الكتب من المخزن اللي التيم استقر عليه
    const allBooks = JSON.parse(localStorage.getItem("books")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        container.innerHTML = `<p>Please login to see your books.</p>`;
        return;
    }

    // 2. هنفلتر الكتب: هات اللي حالته Borrowed واسم المستعير هو المستخدم الحالي
    const myBorrowedBooks = allBooks.filter(book => 
        book.status === "Borrowed" && book.borrowedBy === currentUser.username
    );

    container.innerHTML = "";

    if (myBorrowedBooks.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-size: 18px; grid-column: 1/-1;">You haven't borrowed any books yet.</p>`;
        return;
    }

    // 3. عرض الكتب اللي طلعت في الفلتر
    myBorrowedBooks.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
            <img src="${book.imageUrl || 'images/default-book.jpg'}" alt="${book.title}" class="book-img">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p><strong>Borrowed Date:</strong> ${book.borrowedDate || 'N/A'}</p>
            <div class="actions">
                <button class="btn delete-btn" onclick="returnBook(${book.id})">Return Book</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 4. فانكشن إرجاع الكتاب (تحديث الـ Status بدل المسح)
function returnBook(bookId) {
    let allBooks = JSON.parse(localStorage.getItem("books")) || [];
    const bookIndex = allBooks.findIndex(b => b.id == bookId);

    if (bookIndex !== -1) {
        allBooks[bookIndex].status = "Available"; // نرجعه متاح تاني
        delete allBooks[bookIndex].borrowedBy;    // نمسح اسم اللي كان مستعيره
        delete allBooks[bookIndex].borrowedDate;  // نمسح التاريخ

        localStorage.setItem("books", JSON.stringify(allBooks));
        displayBorrowedBooks(); // ريفرش للقائمة
        alert("Book returned successfully!");
    }
}

// تشغيل العرض عند فتح الصفحة
document.addEventListener("DOMContentLoaded", displayBorrowedBooks);
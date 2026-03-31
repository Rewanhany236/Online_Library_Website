let books = JSON.parse(localStorage.getItem("books")) || [];

let params = new URLSearchParams(window.location.search);
let bookId = params.get("id");

let bookIndex = books.findIndex(b => b.id == bookId);
let book = books[bookIndex];

if (!book) {
    alert("Sorry , this book is not found");
    window.location.href = "books.html";
} else {
    document.getElementById("book-name").value = book.title || ""; 
    document.getElementById("ID").value        = book.id || "";
    document.getElementById("Author").value    = book.author || "";
    document.getElementById("Category").value  = book.category || "";
    document.getElementById("Description").value = book.description || "";
}

/*-----------------------------------------------------------*/

document.getElementById("Done-btn").addEventListener("click", function (e) {
    e.preventDefault(); 

    books[bookIndex].title       = document.getElementById("book-name").value;
    books[bookIndex].author      = document.getElementById("Author").value;
    books[bookIndex].category    = document.getElementById("Category").value;
    books[bookIndex].description = document.getElementById("Description").value;

    
    localStorage.setItem("books", JSON.stringify(books));

    alert("Book info is updated :)");

    window.location.href = "books.html";
});
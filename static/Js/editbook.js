let books = JSON.parse(localStorage.getItem("books")) || [];

let params = new URLSearchParams(window.location.search);
let bookId = Number(params.get("id")); 

let bookIndex = books.findIndex(b => b.id === bookId);
let book = books[bookIndex];

let nameInput = document.getElementById("book-name");
let idInput = document.getElementById("ID");
let authorInput = document.getElementById("Author");
let categoryInput = document.getElementById("Category");
let descriptionInput = document.getElementById("Description");
let doneBtn = document.getElementById("Done-btn");

if (book) {
    nameInput.value = book.title || ""; 
    idInput.value = book.id || "";
    authorInput.value = book.author || "";
    categoryInput.value = book.category || "";
    descriptionInput.value = book.description || "";
} else {
    nameInput.value = "";
    idInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";
    descriptionInput.value = "";

    doneBtn.disabled = true; 
}

doneBtn.addEventListener("click", function (e) {
    e.preventDefault(); 

    if (bookIndex === -1) {
        alert("No book found to update!");
        return;
    }

    books[bookIndex].title = nameInput.value;
    books[bookIndex].author = authorInput.value;
    books[bookIndex].category = categoryInput.value;
    books[bookIndex].description = descriptionInput.value;

    localStorage.setItem("books", JSON.stringify(books));

    alert("Book info is updated :)");
    
    window.location.href = "books.html";
});
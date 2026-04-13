function initLocalStorage() {
  if (!localStorage.getItem("books")) {
    if (typeof books !== 'undefined' && Array.isArray(books)) {
      localStorage.setItem("books", JSON.stringify(books));
    } else {
      localStorage.setItem("books", JSON.stringify([]));
    }
  }
}

function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(booksArray) {
  localStorage.setItem("books", JSON.stringify(booksArray));
}

// convert uploaded image file to base64 string
function imageFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  initLocalStorage(); // ensure localStorage has default books

  const form = document.querySelector("form");
  const bookNameInput = document.getElementById("book-name");
  const idInput = document.getElementById("ID");
  const authorInput = document.getElementById("Author");
  const wikipediaInput = document.getElementById("wikipediaLink");
  const categoryInput = document.getElementById("Category");
  const descriptionInput = document.getElementById("Description");
  const imageInput = document.getElementById("image");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bookName = bookNameInput.value.trim();
    const idValue = idInput.value.trim();
    const author = authorInput.value.trim();
    const category = categoryInput.value.trim();
    const description = descriptionInput.value.trim();
    const imageFile = imageInput.files[0];
    const wikipediaLink = wikipediaInput.value.trim();

  
    if (!bookName) {
      alert("Please enter the book name.");
      bookNameInput.focus();
      return;
    }
    if (!idValue) {
      alert("Please enter the book ID.");
      idInput.focus();
      return;
    }
    if (!author) {
      alert("Please enter the author name.");
      authorInput.focus();
      return;
    }
    if (!category) {
      alert("Please enter the category.");
      categoryInput.focus();
      return;
    }
    if (!description) {
      alert("Please enter the description.");
      descriptionInput.focus();
      return;
    }
    if (!imageFile) {
      alert("Please select an image file.");
      imageInput.focus();
      return;
    }


    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
    if (!allowedTypes.includes(imageFile.type)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, WEBP).");
      return;
    }

    const newId = Number(idValue);
    if (isNaN(newId)) {
      alert("ID must be a number.");
      return;
    }
    const booksArray = getBooks();
    if (booksArray.some(book => book.id === newId)) {
      alert(`A book with ID ${newId} already exists. Please use a different ID.`);
      idInput.focus();
      return;
    }

    let imageBase64;
    try {
      imageBase64 = await imageFileToBase64(imageFile);
    } catch (error) {
      console.error("Image read error:", error);
      alert("Failed to read the image file. Please try again.");
      return;
    }

    const newBook = {
      id: newId,
      title: bookName,
      author: author,
      category: category,
      description: description,
      imageUrl: imageBase64,
      status: "Available"
    };
    if (wikipediaLink) {
      newBook.authorWikipedia = wikipediaLink;
    }

    booksArray.push(newBook);
    saveBooks(booksArray);

    
    alert(`Book "${bookName}" added successfully!`);
    window.location.href = "books.html";
  });
});
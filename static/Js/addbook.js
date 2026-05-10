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

    const form             = document.querySelector("form");
    const bookNameInput    = document.getElementById("book-name");
    const idInput          = document.getElementById("ID");
    const authorInput      = document.getElementById("Author");
    const wikipediaInput   = document.getElementById("wikipediaLink");
    const categoryInput    = document.getElementById("Category");
    const descriptionInput = document.getElementById("Description");
    const imageInput       = document.getElementById("image");

    const cancelBtn = document.getElementById("cancel-btn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            window.location.href = "/books/";
        });
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const bookName      = bookNameInput.value.trim();
        const idValue       = idInput.value.trim();
        const author        = authorInput.value.trim();
        const category      = categoryInput.value.trim();
        const description   = descriptionInput.value.trim();
        const imageFile     = imageInput.files[0];
        const wikipediaLink = wikipediaInput.value.trim();

        if (!bookName) { alert("Please enter the book name."); bookNameInput.focus(); return; }
        if (!idValue)  { alert("Please enter the book ID."); idInput.focus(); return; }
        if (!author)   { alert("Please enter the author name."); authorInput.focus(); return; }
        if (!category) { alert("Please enter the category."); categoryInput.focus(); return; }
        if (!description) { alert("Please enter the description."); descriptionInput.focus(); return; }
        if (!imageFile) { alert("Please select an image file."); imageInput.focus(); return; }

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
        if (!allowedTypes.includes(imageFile.type)) {
            alert("Please select a valid image file (JPEG, PNG, GIF, WEBP).");
            return;
        }

        const newId = Number(idValue);
        if (isNaN(newId)) { alert("ID must be a number."); return; }

        const formData = new FormData();
        formData.append('id', newId);
        formData.append('title', bookName);
        formData.append('author', author);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('image', imageFile);
        if (wikipediaLink) formData.append('author_wikipedia', wikipediaLink);

        try {
            const response = await fetch('/api/books/add/', {
                method: 'POST',
                headers: { 'X-CSRFToken': getCSRFToken() },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Book "${bookName}" added successfully!`);
                window.location.href = "/books/";
            } else {
                alert(data.error || "Failed to add book. Please try again.");
                if (data.field === 'id') idInput.focus();
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Network error. Could not add the book.");
        }
    });
});
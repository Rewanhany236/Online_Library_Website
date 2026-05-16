// editbook.js
document.addEventListener('DOMContentLoaded', async function() {
    console.log("editbook.js loaded");
    
    // Get book ID from URL
    const url = window.location.pathname;
    let bookId = null;
    
    let match = url.match(/\/books\/(\d+)\/edit\//);
    if (match) {
        bookId = match[1];
    }
    
    
    console.log("Book ID:", bookId);
    console.log("Current URL:", url);
    
    if (!bookId) {
        alert('No book ID found in URL!');
        return;
    }
    
    // Get form elements
    const nameInput = document.getElementById("book-name");
    const idInput = document.getElementById("ID");
    const authorInput = document.getElementById("Author");
    const categoryInput = document.getElementById("Category");
    const descriptionInput = document.getElementById("Description");
    const statusSelect = document.getElementById("Status");
    const wikipediaInput = document.getElementById("AuthorWikipedia");
    const imageInput = document.getElementById("Image");
    const doneBtn = document.getElementById("Done-btn");
    
    // Fetch book data from API
    try {
        const response = await fetch(`/api/books/${bookId}/`);
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const book = await response.json();
        console.log("Book data:", book);
        
        // Fill form with existing data
        nameInput.value = book.title || "";
        idInput.value = book.id || "";
        authorInput.value = book.author || "";
        categoryInput.value = book.category || "";
        descriptionInput.value = book.description || "";
        if (statusSelect) statusSelect.value = book.status || "Available";
        if (wikipediaInput) wikipediaInput.value = book.author_wikipedia || "";
        
        // Show current image if exists
        const imageContainer = document.getElementById('current-image-container');
        if (imageContainer && book.image_url) {
            imageContainer.innerHTML = `<img src="${book.image_url}" alt="Current cover" style="max-width: 150px;">`;
        }
        
    } catch (error) {
        console.error('Error fetching book:', error);
        alert('Failed to load book data: ' + error.message);
        doneBtn.disabled = true;
        return;
    }
    
    // Handle form submission
    doneBtn.addEventListener("click", async function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', nameInput.value);
        formData.append('author', authorInput.value);
        formData.append('category', categoryInput.value);
        formData.append('description', descriptionInput.value);
        if (statusSelect) formData.append('status', statusSelect.value);
        if (wikipediaInput) formData.append('author_wikipedia', wikipediaInput.value);
        
        if (imageInput && imageInput.files[0]) {
            formData.append('image', imageInput.files[0]);
        }
        
        const originalText = doneBtn.textContent;
        doneBtn.textContent = 'Updating...';
        doneBtn.disabled = true;
        
        try {
            const response = await fetch(`/api/books/update/${bookId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                },
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                alert(" Book updated successfully!");
                window.location.href = "/books/";
            } else {
                alert("Error: " + (data.error || "Failed to update"));
                doneBtn.textContent = originalText;
                doneBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Network error: " + error.message);
            doneBtn.textContent = originalText;
            doneBtn.disabled = false;
        }
    });
});

function getCsrfToken() {
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
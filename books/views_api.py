# books/views_api.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Book

# GET /api/books/ – list all books
@require_http_methods(["GET"])
def book_list_api(request):
    books = Book.objects.all().values('id', 'title', 'author', 'category', 'status', 'image')
    books_list = list(books)
    for book in books_list:
        if book['image']:
            book['image_url'] = f"/media/{book['image']}"
    return JsonResponse(books_list, safe=False)

# GET /api/books/<id> – book details
@require_http_methods(["GET"])
def book_detail_api(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        data = {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'category': book.category,
            'description': book.description,
            'status': book.status,
            'image_url': book.image.url if book.image else None,
            'author_wikipedia': book.author_wikipedia,
        }
        return JsonResponse(data)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)

# POST /api/books/add/ – add a new book with img
@csrf_exempt
@require_http_methods(["POST"])
def add_book_api(request):
    book_id = request.POST.get('id')
    title = request.POST.get('title')
    author = request.POST.get('author')
    category = request.POST.get('category')
    description = request.POST.get('description')
    image = request.FILES.get('image')
    author_wikipedia = request.POST.get('author_wikipedia', '')

    if not all([book_id, title, author, category, description, image]):
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        book_id = int(book_id)
    except ValueError:
        return JsonResponse({'error': 'ID must be a number', 'field': 'id'}, status=400)

    if Book.objects.filter(id=book_id).exists():
        return JsonResponse({'error': f'Book with ID {book_id} already exists', 'field': 'id'}, status=400)

    allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
    if image.content_type not in allowed_types:
        return JsonResponse({'error': 'Invalid image type'}, status=400)

    book = Book.objects.create(
        id=book_id,
        title=title,
        author=author,
        category=category,
        description=description,
        image=image,
        author_wikipedia=author_wikipedia or None,
        status='Available'
    )
    return JsonResponse({'message': 'Book added', 'book_id': book.id}, status=201)

# POST api/books/<int:book_id>/return/ – return a borrowed book
@csrf_exempt
@require_http_methods(["POST"])
def return_book_api(request, book_id):
    try:
        book = Book.objects.get(id=book_id, borrowed_by=request.user)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found or not borrowed by you'}, status=404)

    book.borrowed_by = None
    book.borrowed_date = None
    book.status = 'Available'
    book.save()
    return JsonResponse({'message': f'"{book.title}" returned successfully'}, status=200)

# PUT /api/books/update/<id>/ – update a book
@csrf_exempt
@require_http_methods(["PUT", "POST"])
def update_book_api(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)
    
    # Handle form data from editbook.js
    book.title = request.POST.get('title', book.title)
    book.author = request.POST.get('author', book.author)
    book.category = request.POST.get('category', book.category)
    book.description = request.POST.get('description', book.description)
    book.author_wikipedia = request.POST.get('author_wikipedia', book.author_wikipedia)
    book.status = request.POST.get('status', book.status)
    
    if request.FILES.get('image'):
        # Delete old image if exists
        if book.image:
            import os
            if os.path.isfile(book.image.path):
                os.remove(book.image.path)
        book.image = request.FILES['image']
    
    book.save()
    return JsonResponse({'success': True, 'message': 'Book updated successfully'})

# DELETE /api/books/delete/<id>/ – delete a book
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_book_api(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        # Delete image file if exists
        if book.image:
            import os
            if os.path.isfile(book.image.path):
                os.remove(book.image.path)
        book.delete()
        return JsonResponse({'success': True, 'message': 'Book deleted successfully'})
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)
    
    
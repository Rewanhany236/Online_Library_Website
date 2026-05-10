from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from .models import Book

class HomeView(TemplateView):
    template_name = 'home.html'

# CHANGED: TemplateView → ListView so it automatically fetches books
class BooksView(ListView):
    model = Book                    # tells Django which model to query
    template_name = 'books.html'   # which template to render
    context_object_name = 'books'  # the variable name used in the template {{ books }}

class AddBookView(TemplateView):
    template_name = 'addbook.html'

class BookDetailView(TemplateView):
    template_name = 'book-details.html'

class ProfileView(TemplateView):
    template_name = 'profile.html'

class EditBookView(TemplateView):
    template_name = 'editbook.html'   

def book_list(request):
    books = Book.objects.all()
    return render(request, 'books.html', {'books': books})

from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from .models import Book
from django.shortcuts import render, get_object_or_404
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib import messages


class HomeView(TemplateView):
    template_name = 'home.html'

class BooksView(ListView):
    model = Book                    # tells Django which model to query
    template_name = 'books.html'   # which template to render
    context_object_name = 'books'  # the variable name used in the template {{ books }}

class AddBookView(TemplateView):
    template_name = 'addbook.html'

class BookDetailView(TemplateView):
    template_name = 'books-details.html'

class ProfileView(TemplateView):
    template_name = 'profile.html'

class EditBookView(TemplateView):
    template_name = 'editbook.html'   

def book_list(request):
    books = Book.objects.all()
    return render(request, 'books.html', {'books': books})

def book_detail(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    return render(request, 'books-details.html', {'book' : book})   

def signup(request):
    if request.user.is_authenticated:
        return redirect('book_list')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email    = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm  = request.POST.get('confirm', '')

        if not username or not email or not password or not confirm:
            messages.error(request, 'Please fill all fields.')
            return render(request, 'signup.html')

        if len(password) < 8:
            messages.error(request, 'Password must be at least 8 characters.')
            return render(request, 'signup.html')

        if password != confirm:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'signup.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
            return render(request, 'signup.html')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'You already have an account. Please login.')
            return redirect('login')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )
        login(request, user)
        return redirect('book_list')

    return render(request, 'signup.html')    

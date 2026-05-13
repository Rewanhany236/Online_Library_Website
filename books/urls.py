from django.urls import path
from . import views
from . import views_api   # import the API views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # API routes (must come first or at least be present)
    path('api/books/', views_api.book_list_api, name='api_book_list'),
    path('api/books/add/', views_api.add_book_api, name='api_add_book'),
    # (add other API endpoints as needed: detail, edit, delete)

    # HTML page routes
    path('', views.HomeView.as_view(), name='home'),
    path('books/', views.BooksView.as_view(), name='book_list'),
    path('books/add/', views.AddBookView.as_view(), name='add_book'),
    path('books/<int:pk>/', views.BookDetailView.as_view(), name='book_detail'),
    path('books/<int:pk>/edit/', views.EditBookView.as_view(), name='edit_book'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('book/<int:book_id>/', views.book_detail, name='book_detail'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
]
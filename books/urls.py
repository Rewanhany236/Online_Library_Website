from django.urls import path
from . import views
from . import views_api   # import the API views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # API routes (must come first or at least be present)
    path('api/books/', views_api.book_list_api, name='api_book_list'),
    path('api/books/add/', views_api.add_book_api, name='api_add_book'),
    # (add other API endpoints as needed: detail, edit, delete)
    path('api/books/<int:book_id>/', views_api.book_detail_api, name='api_book_detail'),
    path('edit-book/<int:book_id>/', views.edit_book_page, name='edit_book_page'),
    path('api/books/update/<int:book_id>/', views_api.update_book_api, name='update_book_api'),
    path('api/books/<int:book_id>/delete/', views_api.delete_book_api, name='delete_book_api'),   
    path('api/books/<int:book_id>/borrow/', views_api.borrow_book_api, name='api_borrow_book'),
    
    # HTML page routes
    
    path('', views.HomeView.as_view(), name='home'),
    path('books/', views.BooksView.as_view(), name='book_list'),
    path('books/add/', views.AddBookView.as_view(), name='add_book'),
    path('books/<int:pk>/', views.BookDetailView.as_view(), name='book_detail'),
    path('books/<int:pk>/edit/', views.EditBookView.as_view(), name='edit_book'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'),
    path('api/books/<int:book_id>/return/', views_api.return_book_api, name='api_return_book'),
    path('borrowed/', views.BorrowedBooksView.as_view(), name='borrowed_books'),
]

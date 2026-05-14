from django.db import models
from django.conf import settings

class Book(models.Model):
    id = models.IntegerField(primary_key=True)   #custom id
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, default='Available')
    image = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    author_wikipedia = models.URLField(blank=True, null=True)
    borrowed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='borrowed_books'
    )
    borrowed_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title
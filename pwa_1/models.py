from django.db import models
#from django.contrib.auth import get_user_model
from django.conf import settings

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=40, unique=True)
    text = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    @classmethod
    def process_pwa_query(cls, query, request):
        return query

    @classmethod
    def update_pwa_request(cls, query, data, request, is_created):
        if not request.user.is_authenticated:
            return "Not authenticated"
        for oldtitle, value in data:
            # author is a forbidden field
            if "author" not in value:
                query.update_or_create(value, author=request.user, title=oldtitle)
        return "success"

    @classmethod
    def delete_pwa_request(cls, query, request):
        if not request.user.is_authenticated:
            return "Not authenticated"
        query.filter(author=request.user).delete()
        return "success"

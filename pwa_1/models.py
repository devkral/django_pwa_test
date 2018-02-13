from django.db import models
#from django.contrib.auth import get_user_model
from django.conf import settings

# Create your models here.

class BlogPost(models.Model):
    title = models.CharField(max_length=40, unique=True)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    @classmethod
    def process_pwa_query(cls, query, request):
        ret = []
        for i in query:
            ret.append({"id": i.id,
                        "title": i.title,
                        "content": i.content,
                        "author": i.author.get_full_name(),
                        "author_email": i.author.email})
        return ret

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

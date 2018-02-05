from django.contrib import admin
try:
    from django.urls import path, include
except ImportError:
    from django.conf.urls import include
    from django.conf.urls import url as path

from django.views.generic.base import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="home.html")),
]

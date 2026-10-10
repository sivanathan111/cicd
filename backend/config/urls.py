from django.urls import path
from datasets.views import hello

urlpatterns = [
    path("api/hello/", hello),
]
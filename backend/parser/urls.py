from django.urls import path
from .views import FileUploadAPIView, HistoryAPIView ,TimelineAPIView

urlpatterns = [
    path("upload/", FileUploadAPIView.as_view(), name="upload-file"),
    path("history/", HistoryAPIView.as_view(), name="history"),
    path("timeline/", TimelineAPIView.as_view(), name="timeline"),
]

from django.urls import path
from .views import (
    FileUploadAPIView,
    HistoryAPIView,
    TimelineAPIView,
    VariableInspectorAPIView,
    DashboardStatsAPIView,
)

urlpatterns = [
    path("upload/", FileUploadAPIView.as_view(), name="upload"),
    path("history/", HistoryAPIView.as_view(), name="history"),
    path("timeline/", TimelineAPIView.as_view(), name="timeline"),
    path("variables/", VariableInspectorAPIView.as_view(), name="variables"),
    path("dashboard/", DashboardStatsAPIView.as_view(), name="dashboard"),
]

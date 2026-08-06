from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView

from .ast_parser import analyze_python_code
from .models import ExecutionEvent
from .serializers import ExecutionEventSerializer


class FileUploadAPIView(APIView):

    def post(self, request):

        uploaded_file = request.FILES.get("file")

        if not uploaded_file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        code = uploaded_file.read().decode("utf-8")

        result = analyze_python_code(code)

        for variable in result["variables"]:
         ExecutionEvent.objects.create(
          filename=uploaded_file.name,
          variable_name=variable["name"],
          line_number=variable["line"],
          serialized_value="Detected by AST",
    )

        return Response({
    "status": "success",
    "filename": uploaded_file.name,
    "variables": [v["name"] for v in result["variables"]],
    "functions": [f["name"] for f in result["functions"]],
    "variable_count": result["variable_count"],
    "function_count": result["function_count"]
})


class HistoryAPIView(ListAPIView):
    queryset = ExecutionEvent.objects.all().order_by("-timestamp")
    serializer_class = ExecutionEventSerializer


class TimelineAPIView(ListAPIView):
    queryset = ExecutionEvent.objects.all().order_by("-timestamp")
    serializer_class = ExecutionEventSerializer


class VariableInspectorAPIView(APIView):

    def get(self, request):

        variable = request.GET.get("name")

        queryset = ExecutionEvent.objects.all()

        if variable:
            queryset = queryset.filter(variable_name=variable)

        serializer = ExecutionEventSerializer(
            queryset.order_by("-timestamp"),
            many=True
        )

        return Response(serializer.data)

class DashboardStatsAPIView(APIView):

    def get(self, request):

        total_events = ExecutionEvent.objects.count()

        total_variables = (
            ExecutionEvent.objects.values("variable_name")
            .distinct()
            .count()
        )

        total_uploads = (
            ExecutionEvent.objects.values("filename")
            .distinct()
            .count()
        )

        latest = ExecutionEvent.objects.order_by("-timestamp").first()

        return Response({
            "events": total_events,
            "variables": total_variables,
            "uploads": total_uploads,
            "latest_file": latest.filename if latest else "",
            "latest_time": latest.timestamp if latest else "",
        })

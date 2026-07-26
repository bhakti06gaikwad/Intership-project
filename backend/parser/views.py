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

        try:
            code = uploaded_file.read().decode("utf-8")
        except Exception:
            return Response(
                {"error": "Unable to read file"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = analyze_python_code(code)

        # Save variables into database
        for variable in result["variables"]:
            ExecutionEvent.objects.create(
                filename=uploaded_file.name,
                variable_name=variable,
                line_number=0,
                serialized_value="Detected by AST"
            )

        return Response(
            {
                "status": "success",
                "filename": uploaded_file.name,
                "variables": result["variables"],
                "functions": result["functions"],
                "variable_count": result["variable_count"],
                "function_count": result["function_count"],
            },
            status=status.HTTP_200_OK,
        )


class HistoryAPIView(ListAPIView):

    queryset = ExecutionEvent.objects.all().order_by("-timestamp")
    serializer_class = ExecutionEventSerializer

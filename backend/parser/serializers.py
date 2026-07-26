from rest_framework import serializers
from .models import ExecutionEvent


class PythonFileSerializer(serializers.Serializer):
    file = serializers.FileField()


class ExecutionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExecutionEvent
        fields = "__all__"

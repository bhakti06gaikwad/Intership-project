from rest_framework import serializers


class PythonFileSerializer(serializers.Serializer):
    file = serializers.FileField()

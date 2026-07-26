from django.db import models

# Create your models here.
class ExecutionEvent(models.Model):
    filename = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    variable_name = models.CharField(max_length=100)
    line_number = models.IntegerField(default=0)
    serialized_value = models.TextField(blank=True)

    def __str__(self):
        return f"{self.filename} - {self.variable_name}"

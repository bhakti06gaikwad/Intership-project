from django.db import models

class ExecutionEvent(models.Model):

    filename = models.CharField(max_length=255)

    variable_name = models.CharField(max_length=100)

    serialized_value = models.TextField()

    line_number = models.IntegerField()

    function_name = models.CharField(
        max_length=100,
        blank=True,
        default=""
    )

    execution_time = models.FloatField(default=0)

    event_type = models.CharField(
        max_length=50,
        default="variable"
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.filename} - {self.variable_name}"

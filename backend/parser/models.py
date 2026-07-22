from django.db import models

# Create your models here.
class ExecutionEvent(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    line_number = models.IntegerField()
    variable_name = models.CharField(max_length=100)
    serialized_value = models.TextField()

    class Meta:
        ordering = ["timestamp"]

    def __str__(self):
        return f"{self.variable_name} @ Line {self.line_number}"

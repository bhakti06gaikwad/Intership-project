from parser.models import ExecutionEvent


def track_variable(variable_name, value, line_number):
    
  #  Save variable information into the database.
  

    ExecutionEvent.objects.create(
        variable_name=variable_name,
        line_number=line_number,
        serialized_value=repr(value),
    )

    print(
        f"[TRACK] {variable_name} = {value} (Line {line_number})"
    )

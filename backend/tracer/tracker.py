import sys

execution_events = []

def trace(frame, event, arg):
    if event == "line":
        local_vars = frame.f_locals.copy()

        execution_events.append({
            "line": frame.f_lineno,
            "variables": local_vars
        })

    return trace

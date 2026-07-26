import ast


class VariableVisitor(ast.NodeVisitor):

    def __init__(self):
        self.variables = []
        self.functions = []

    def visit_Assign(self, node):
        for target in node.targets:
            if isinstance(target, ast.Name):
                self.variables.append({
                    "name": target.id,
                    "line": node.lineno
                })
        self.generic_visit(node)

    def visit_FunctionDef(self, node):
        self.functions.append(node.name)
        self.generic_visit(node)


def analyze_python_code(code):

    tree = ast.parse(code)

    visitor = VariableVisitor()

    visitor.visit(tree)

    return {
        "variables": visitor.variables,
        "functions": visitor.functions,
        "variable_count": len(visitor.variables),
        "function_count": len(visitor.functions),
    }

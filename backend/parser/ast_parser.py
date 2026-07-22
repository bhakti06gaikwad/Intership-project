
import ast
from pathlib import Path


class VariableVisitor(ast.NodeVisitor):

    def __init__(self):
        self.variables = []

    def visit_Assign(self, node):
        for target in node.targets:

            # x = 10
            if isinstance(target, ast.Name):
                self.variables.append({
                    "variable": target.id,
                    "line": node.lineno
                })

            # a, b = (1, 2)
            elif isinstance(target, ast.Tuple):
                for element in target.elts:
                    if isinstance(element, ast.Name):
                        self.variables.append({
                            "variable": element.id,
                            "line": node.lineno
                        })

        self.generic_visit(node)


class ASTParser:

    def __init__(self, file_path):
        self.file_path = Path(file_path)

    def read_source(self):
        return self.file_path.read_text(encoding="utf-8")

    def parse(self):
        source = self.read_source()
        return ast.parse(source)

    def extract_variables(self):
        tree = self.parse()

        visitor = VariableVisitor()
        visitor.visit(tree)

        return visitor.variables


if __name__ == "__main__":

    parser = ASTParser("examples/simple.py")

    variables = parser.extract_variables()

    print("=" * 50)
    print("Variables Found")
    print("=" * 50)

    for var in variables:
        print(
            f"Variable: {var['variable']} | Line: {var['line']}"
        )

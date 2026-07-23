import os
import ast
import sys
from pathlib import Path

# Add backend directory to Python path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from parser.models import ExecutionEvent


class VariableVisitor(ast.NodeVisitor):

    def __init__(self):
        self.variables = []

    def visit_Assign(self, node):

        for target in node.targets:

            # x = 10
            if isinstance(target, ast.Name):
                self.variables.append(
                    {
                        "name": target.id,
                        "line": node.lineno,
                    }
                )

            # a, b = (1,2)
            elif isinstance(target, ast.Tuple):

                for element in target.elts:

                    if isinstance(element, ast.Name):
                        self.variables.append(
                            {
                                "name": element.id,
                                "line": node.lineno,
                            }
                        )

        self.generic_visit(node)


class ASTParser:

    def __init__(self, filepath):
        self.filepath = Path(filepath)

    def parse(self):

        source = self.filepath.read_text(encoding="utf-8")

        tree = ast.parse(source)

        visitor = VariableVisitor()
        visitor.visit(tree)

        return visitor.variables


def save_to_database(variables):

    for variable in variables:

        ExecutionEvent.objects.create(
            line_number=variable["line"],
            variable_name=variable["name"],
            serialized_value="None"
        )


if __name__ == "__main__":

    parser = ASTParser("examples/simple.py")

    variables = parser.parse()

    save_to_database(variables)

    print("\nVariables Stored Successfully\n")

    for item in variables:
        print(item)

import ast


class AssignmentTransformer(ast.NodeTransformer):

    def visit_Assign(self, node):

        self.generic_visit(node)

        if len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):

            variable = node.targets[0].id

            tracker = ast.Expr(
                value=ast.Call(
                    func=ast.Name(
                        id="track_variable",
                        ctx=ast.Load()
                    ),
                    args=[
                        ast.Constant(variable),
                        ast.Name(variable, ast.Load()),
                        ast.Constant(node.lineno),
                    ],
                    keywords=[],
                )
            )

            return [node, tracker]

        return node


def instrument(source):

    tree = ast.parse(source)

    transformer = AssignmentTransformer()

    tree = transformer.visit(tree)

    ast.fix_missing_locations(tree)

    return ast.unparse(tree)


if __name__ == "__main__":

    code = """
x = 10
y = 20
z = x + y
"""

    print(instrument(code))

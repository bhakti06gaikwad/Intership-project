import ast
from pathlib import Path


class ASTParser:

    def __init__(self, file_path: str):
        self.file_path = Path(file_path)

    def read_source(self) -> str:

        if not self.file_path.exists():
            raise FileNotFoundError(f"File not found: {self.file_path}")

        return self.file_path.read_text(encoding="utf-8")

    def parse(self) -> ast.AST:
       
        source_code = self.read_source()
        tree = ast.parse(source_code)
        return tree

    def display_tree(self):
        
        tree = self.parse()
        print(ast.dump(tree, indent=4))


if __name__ == "__main__":
    sample_file = "examples/simple.py"

    parser = ASTParser(sample_file)

    print("=" * 60)
    print("PyChronicle AST Parser")
    print("=" * 60)

    parser.display_tree()

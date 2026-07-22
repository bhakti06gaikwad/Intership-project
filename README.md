# PyChronicle
### AST-Powered Time-Travel Debugger for Python

PyChronicle is a developer tool that enables **time-travel debugging** for Python applications. Instead of restarting a program after every bug, developers can replay execution, inspect previous variable states, and navigate through program history.

---

## Project Overview

Traditional Python debuggers are linear—they allow developers to move forward through execution only.

PyChronicle records every important execution event and stores variable changes in a timeline. This allows developers to move backward and forward in time without rerunning the program.

The project combines Python's **Abstract Syntax Tree (AST)**, **sys.settrace**, and a **Django REST backend** to provide an advanced debugging experience.

---

# Features

-  AST Parsing
-  AST Rewriting
-  Runtime Execution Tracing
-  Variable History Tracking
-  Time-Travel Debugging
-  Execution Timeline
-  Project Management
-  JWT Authentication
-  REST API
-  Execution Reports
-  Docker Support
-  Swagger API Documentation

---

# Tech Stack

## Backend

- Python 3.12
- Django
- Django REST Framework
- SQLite
- PostgreSQL
- JWT Authentication

## Frontend

- React
- TypeScript
- Tailwind CSS
- Monaco Editor

## DevOps

- Docker
- GitHub Actions
- Nginx

---

# Project Structure

```
PyChronicle/
│
├── backend/
│   ├── config/
│   ├── authentication/
│   ├── users/
│   ├── parser/
│   ├── tracer/
│   ├── execution/
│   ├── timeline/
│   ├── debugger/
│   ├── analytics/
│   ├── reports/
│   └── api/
│
├── frontend/
├── docker/
├── docs/
├── scripts/
├── tests/
│
├── README.md
├── LICENSE
└── docker-compose.yml
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/yourusername/PyChronicle.git
```

Move into project

```bash
cd PyChronicle
```

Create virtual environment

```bash
python -m venv venv
```

Activate environment

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r backend/requirements.txt
```

Run Django Server

```bash
cd backend

python manage.py migrate

python manage.py runserver
```

---

# Development Roadmap

### Phase 1
- Project Setup
- Authentication
- REST Framework
- Project Management

### Phase 2
- AST Parser
- AST Rewriter
- Code Instrumentation

### Phase 3
- Execution Tracer
- Variable Tracking
- Timeline Storage

### Phase 4
- Time Travel Engine
- Replay Execution
- State Comparison

### Phase 5
- React Dashboard
- Monaco Editor
- Timeline UI

### Phase 6
- Docker Deployment
- CI/CD
- Testing
- Documentation

---

# Future Enhancements

- AI Bug Explanation
- Live Code Collaboration
- Cloud Execution
- Multi-language Debugging
- VS Code Extension

---

# Current Status

 Under Active Development

---

# Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.


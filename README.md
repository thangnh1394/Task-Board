# Task Board

A Kanban-style task management application.

## Tech Stack

- **Frontend:** Angular 19
- **Backend:** .NET 8 Web API

## Getting Started

### Run Backend
```bash
cd TaskBoardApi
dotnet run
# API: http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

### Run Frontend
```bash
cd ClientApp
npm install
ng serve
# App: http://localhost:4200
```

## Features

- ✅ Create, edit, delete tasks
- ✅ Drag and drop between columns
- ✅ Priority levels (Low, Medium, High)
- ✅ Status columns (To Do, In Progress, Done)
// Repositories/TaskRepository.cs
using TaskBoardApi.Models;

namespace TaskBoardApi.Repositories;

public class TaskRepository
{
    private readonly List<TaskItem> _tasks = new()
    {
        new TaskItem
        {
            Id = "1",
            Title = "Learn Angular basics",
            Description = "Study components, templates, and data binding",
            Status = "done",
            Priority = "high",
            CreatedAt = DateTime.Parse("2024-01-10")
        },
        new TaskItem
        {
            Id = "2",
            Title = "Build task board UI",
            Description = "Create the board layout with columns",
            Status = "in-progress",
            Priority = "high",
            CreatedAt = DateTime.Parse("2024-01-11")
        },
        new TaskItem
        {
            Id = "3",
            Title = "Add drag and drop",
            Description = "Implement drag and drop between columns",
            Status = "to-do",
            Priority = "medium",
            CreatedAt = DateTime.Parse("2024-01-12")
        }
    };

    public List<TaskItem> GetAll() => _tasks;

    public TaskItem? GetById(string id) => _tasks.FirstOrDefault(t => t.Id == id);

    public TaskItem Create(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Id = Guid.NewGuid().ToString(),
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            CreatedAt = DateTime.UtcNow
        };
        _tasks.Add(task);
        return task;
    }

    public TaskItem? Update(string id, UpdateTaskDto dto)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return null;

        if (dto.Title != null) task.Title = dto.Title;
        if (dto.Description != null) task.Description = dto.Description;
        if (dto.Status != null) task.Status = dto.Status;
        if (dto.Priority != null) task.Priority = dto.Priority;

        return task;
    }

    public bool Delete(string id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return false;
        _tasks.Remove(task);
        return true;
    }
}
// Models/TaskItem.cs
namespace TaskBoardApi.Models;

public class TaskItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = "to-do";
    public string Priority { get; set; } = "medium";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = "to-do";
    public string Priority { get; set; } = "medium";
}

public class UpdateTaskDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public string? Priority { get; set; }
}
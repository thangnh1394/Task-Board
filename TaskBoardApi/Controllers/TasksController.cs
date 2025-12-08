// Controllers/TasksController.cs
using Microsoft.AspNetCore.Mvc;
using TaskBoardApi.Models;
using TaskBoardApi.Repositories;

namespace TaskBoardApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskRepository _repository;

    public TasksController(TaskRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public ActionResult<List<TaskItem>> GetAll()
    {
        return Ok(_repository.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<TaskItem> GetById(string id)
    {
        var task = _repository.GetById(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public ActionResult<TaskItem> Create(CreateTaskDto dto)
    {
        var task = _repository.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public ActionResult<TaskItem> Update(string id, UpdateTaskDto dto)
    {
        var task = _repository.Update(id, dto);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(string id)
    {
        var deleted = _repository.Delete(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
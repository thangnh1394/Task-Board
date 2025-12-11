import { Component, inject } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { Column } from '../components/column/column';
import { TaskForm } from '../components/task-form/task-form';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [Column, TaskForm, AsyncPipe],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  taskService = inject(TaskService);

  todoTasks = this.taskService.todoTasks$;
  inProgressTasks = this.taskService.inProgressTasks$;
  doneTasks = this.taskService.doneTasks$;
  isLoading = this.taskService.isLoading;
  errorMessage = this.taskService.errorMessage;

  showForm = false;
  editingTask: Task | null = null;

  onAddTask() {
    this.editingTask = null;
    this.showForm = true;
  }

  onEditTask(task: Task) {
    this.editingTask = task;
    this.showForm = true;
  }

  onSaveTask(taskData: Omit<Task, 'id' | 'createdAt'>) {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id, taskData);
    } else {
      this.taskService.addTask(taskData);
    }
    this.closeForm();
  }

  onDeleteTask(taskId: string) {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      this.taskService.deleteTask(taskId);
    }
  }

  closeForm() {
    this.showForm = false;
    this.editingTask = null;
  }
}

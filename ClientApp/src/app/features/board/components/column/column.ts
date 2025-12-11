import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) status!: 'to-do' | 'in-progress' | 'done';
  @Input() tasks: Task[] = [];

  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  onEditTask(task: Task) {
    this.editTask.emit(task);
  }

  onDeleteTask(taskId: string) {
    this.deleteTask.emit(taskId);
  }
}

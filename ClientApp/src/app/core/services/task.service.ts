import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private apiUrl = `${environment.apiUrl}/tasks`;

  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  public isLoading = this.loading.asReadonly();
  public errorMessage = this.error.asReadonly();

  readonly allTasks$: Observable<Task[]> = this.refreshTrigger$.pipe(
    switchMap(() =>
      this.http.get<Task[]>(this.apiUrl).pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        tap((tasks) => console.log('✅ Tasks loaded:', tasks.length)),
        catchError((err) => {
          this.error.set('Failed to load tasks');
          console.error('❌ Error loading tasks:', err);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
    ),

    shareReplay(1)
  );

  readonly todoTasks$: Observable<Task[]> = this.allTasks$.pipe(
    map((tasks) => tasks.filter((t) => t.status === 'to-do'))
  );
  readonly inProgressTasks$: Observable<Task[]> = this.allTasks$.pipe(
    map((tasks) => tasks.filter((t) => t.status === 'in-progress'))
  );
  readonly doneTasks$: Observable<Task[]> = this.allTasks$.pipe(
    map((tasks) => tasks.filter((t) => t.status === 'done'))
  );

  refreshTasks(): void {
    this.refreshTrigger$.next();
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    this.http
      .post<Task>(this.apiUrl, task)
      .pipe(
        tap((newTask) => console.log('✅ Task added:', newTask.title)),
        catchError((err) => {
          this.error.set('Failed to add task');
          console.error('Error adding task:', err);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.refreshTasks();
        },
      });
  }

  updateTask(id: string, updates: Partial<Task>) {
    this.http
      .put<Task>(`${this.apiUrl}/${id}`, updates)
      .pipe(
        catchError((err) => {
          this.error.set('Failed to update task');
          console.error('Error updating task:', err);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.refreshTasks();
        },
      });
  }

  deleteTask(id: string) {
    this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((err) => {
          this.error.set('Failed to delete task');
          console.error('Error deleting task:', err);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.refreshTasks();
        },
      });
  }
}

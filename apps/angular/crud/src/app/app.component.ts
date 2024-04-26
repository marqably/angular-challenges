import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  todos$ = this.todoSrv.getAllTodos();

  constructor(private todoSrv: TodoService) {}

  update(updateTodo: Todo) {
    this.todoSrv.updateTodo(updateTodo).subscribe((newTodo) => {
      updateTodo.title = newTodo.title;
    });
  }

  delete(deleteTodo: Todo) {
    this.todoSrv.deleteTodo(deleteTodo).subscribe(() => {
      this.deleteTodoFromObservable(deleteTodo.id);
    });
  }

  deleteTodoFromObservable(id: number) {
    this.todos$ = this.todos$.pipe(
      map((todos) => todos.filter((todo) => todo.id !== id)),
    );
  }
}

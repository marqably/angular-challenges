import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of this.todoSrv.todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  constructor(public todoSrv: TodoService) {}

  update(updateTodo: Todo): void {
    this.todoSrv.updateTodo(updateTodo);
  }

  delete(deleteTodo: Todo): void {
    this.todoSrv.deleteTodo(deleteTodo);
  }
}

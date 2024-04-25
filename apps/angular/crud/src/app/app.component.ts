import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { scan } from 'rxjs';
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
      this.todos$ = this.todos$.pipe(
        scan(
          (todos: Todo[], _) =>
            todos.filter((todo) => todo.id !== deleteTodo.id),
          [],
        ),
      );
    });
    // this.todoSrv.deleteTodo(deleteTodo).subscribe(() => {
    //   this.todos$ = this.todoSrv.getAllTodos();
    // });

    // this.todos$ = this.todos$.pipe(
    //   map((todos) => todos.filter((todo) => todo !== deleteTodo)),
    //   // tap((todos) => {
    //   //   console.log(todos);
    //   // }),
    //   map((todo) => {
    //     filter((todo) => todo !== deleteTodo);
    //   }),
    // );
  }
}

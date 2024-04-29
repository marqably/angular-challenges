import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, tap } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {
    this.http
      .get<Todo[]>(this.Endpoint)
      .pipe(
        tap((value) => {
          this.todos$.next(value);
        }),
      )
      .subscribe();
  }

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8',
  });

  readonly Endpoint = 'https://jsonplaceholder.typicode.com/todos';

  public todos$ = new BehaviorSubject<Todo[]>([]);

  public getAllTodos() {
    return this.http.get<Todo[]>(this.Endpoint);
  }

  public updateTodo(todo: Todo) {
    const body = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    });

    this.http
      .put<Todo>(`${this.Endpoint}/${todo.id}`, body, {
        headers: this.httpHeaders,
      })
      .subscribe((newTodo) => {
        this.todos$.next(
          this.todos$.value.map((todo) =>
            todo.id === newTodo.id ? newTodo : todo,
          ),
        );
      });
  }

  public deleteTodo(deleteTodo: Todo) {
    this.http.delete(`${this.Endpoint}/${deleteTodo.id}`).subscribe(() => {
      this.todos$.next(
        this.todos$.value.filter((todo) => todo.id !== deleteTodo.id),
      );
    });
  }
}

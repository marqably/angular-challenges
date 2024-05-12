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
    this.initTodos();
  }

  private initTodos(): void {
    this.http
      .get<Todo[]>(this.endpoint)
      .pipe(
        tap((value) => {
          this._todos$.next(value);
        }),
      )
      .subscribe();
  }

  private readonly httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8',
  });
  private readonly endpoint = 'https://jsonplaceholder.typicode.com/todos';
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  // Everything is void and data only gets exposed via the public todos$ Observable
  public todos$ = this._todos$.asObservable();

  public updateTodo(todo: Todo): void {
    const body = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    });

    this.http
      .put<Todo>(`${this.endpoint}/${todo.id}`, body, {
        headers: this.httpHeaders,
      })
      .subscribe((newTodo) => {
        this._todos$.next(
          this._todos$.value.map((todo) =>
            todo.id === newTodo.id ? newTodo : todo,
          ),
        );
      });
  }

  public deleteTodo(deleteTodo: Todo): void {
    this.http.delete(`${this.endpoint}/${deleteTodo.id}`).subscribe(() => {
      this._todos$.next(
        this._todos$.value.filter((todo) => todo.id !== deleteTodo.id),
      );
    });
  }
}

import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8',
  });

  public getAllTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public updateTodo(todo: Todo) {
    const body = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    });

    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      body,
      {
        headers: this.httpHeaders,
      },
    );
  }

  public deleteTodo(todo: Todo) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }
}

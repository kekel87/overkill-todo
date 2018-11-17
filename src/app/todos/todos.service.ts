import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from './todo';

@Injectable()
export class TodosService {

  private apiUrl = 'api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodo(id: string | number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  saveTodo(todo: Todo): Observable<Todo> {
    if (todo.id) {
      return this.http.put<Todo>(this.apiUrl, todo);
    }

    return this.http.post<Todo>(this.apiUrl, todo);
  }

}

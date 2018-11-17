import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Todo } from './Todo';
import {
  LoadFail,
  LoadSuccess,
  Save,
  SaveFail,
  SaveSuccess,
  TodosActionTypes,
} from './todos.actions';
import { TodosService } from './todos.service';

@Injectable()
export class TodosEffects {

  constructor(private actions$: Actions, private todosService: TodosService) { }

  @Effect()
  loadTodos$: Observable<Action> = this.actions$.pipe(
    ofType(TodosActionTypes.Load),
    switchMap(() =>
      this.todosService.getTodos().pipe(
        map((todos: Todo[]) => new LoadSuccess(todos)),
        catchError(error => of(new LoadFail(error)))
      )
    )
  );

  @Effect()
  saveTodos$: Observable<Action> = this.actions$.pipe(
    ofType(TodosActionTypes.Save),
    switchMap((action: Save) =>
      this.todosService.saveTodo(action.todo).pipe(
        map((todo: Todo) => new SaveSuccess(todo)),
        catchError(error => of(new SaveFail(error)))
      )
    )
  );
}

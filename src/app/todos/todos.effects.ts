import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, toArray, map, catchError, mergeMap } from 'rxjs/operators';

import { TodosService } from './todos.service';
import {
  TodosActions,
  TodosActionTypes,
  Load,
  LoadFail,
  LoadSuccess
} from './todos.actions';
import { Todo } from './Todo';

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
}

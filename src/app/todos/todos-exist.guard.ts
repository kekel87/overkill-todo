import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import * as todosActions from './todos.actions';
import * as fromTodos from './todos.reducer';
import { TodosService } from './todos.service';

@Injectable()
export class TodoExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromTodos.State>,
    private todosService: TodosService,
    private router: Router
  ) { }

  hasTodoInStore(id: number): Observable<boolean> {
    return this.store.pipe(
      select(fromTodos.getTodosEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  hasTodoInApi(id: number): Observable<boolean> {
    return this.todosService.getTodos().pipe(
      map((todos) => new todosActions.LoadSuccess(todos)),
      tap((action: todosActions.LoadSuccess) => this.store.dispatch(action)),
      map(action => {
        if (!action.todos[id]) {
          this.router.navigate(['/404']);
        }
        return !!action.todos[id];
      }),
      take(1)
    );
  }

  hasTodo(id: number): Observable<boolean> {
    return this.hasTodoInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasTodoInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return route.params['id'] === 'new'
      ? of(true)
      : this.hasTodo(route.params['id']);
  }
}

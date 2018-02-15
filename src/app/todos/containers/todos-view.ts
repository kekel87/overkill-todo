import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import * as fromTodos from '../todos.reducer';
import * as todos from '../todos.actions';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todos-view.html',
  styleUrls: ['./todos-view.scss']
})
export class TodosViewComponent implements OnDestroy {
  actionsSubscription: Subscription;
  todo$: Observable<Todo>;

  constructor(private store: Store<fromTodos.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new todos.Select(params.id)))
      .subscribe(store);

    this.todo$ = store.pipe(select(fromTodos.getCurrentTodo));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}

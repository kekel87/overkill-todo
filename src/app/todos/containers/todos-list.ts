import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromTodos from '../todos.reducer';
import * as todos from '../todos.actions';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todos-list.html',
  styleUrls: ['./todos-list.scss']
})
export class TodosListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  microLoading$: Observable<boolean>;

  constructor(private store: Store<fromTodos.State>) {
    this.todos$ = this.store.pipe(select(fromTodos.selectAllTodos));
    this.loading$ = this.store.pipe(select(fromTodos.selectTodosLoading));
    this.microLoading$ = this.store.pipe(select(fromTodos.selectTodosMicroLoading));
  }

  ngOnInit() {
    this.store.dispatch(new todos.Load());
  }

  toggleTodo(todo: Todo) {
    this.store.dispatch(new todos.Save(todo));
  }
}

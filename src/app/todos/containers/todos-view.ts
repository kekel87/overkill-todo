import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map, take, filter } from 'rxjs/operators';

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
  microLoading$ = this.store.pipe(select(fromTodos.getTodosMicroLoading));
  actionsSubscription: Subscription;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromTodos.State>,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.createForm();

    this.actionsSubscription = route.params
      .pipe(map(params => new todos.Select(params.id)))
      .subscribe(store);

    this.store.pipe(
      select(fromTodos.getCurrentTodo),
      take(1)
    ).subscribe((data) => {
      if (data) {
        this.form.patchValue(data);
      }
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      id: null,
      state: false,
      title: ['', Validators.required],
      description: ''
    });
  }

  getErrorMessage(field: string) {
    return this.form.get(field).hasError('required') ? 'Le titre est requis' : '';
  }

  submit() {
    this.form.updateValueAndValidity();

    if (!this.form.invalid) {
      this.store.dispatch(new todos.Save(this.form.value));

      this.microLoading$.pipe(
        filter(v => !v),
        take(1)
      ).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/todos']);
      });
    }
  }

  isErrorState(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid);
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import * as todos from '../todos.actions';
import * as fromTodos from '../todos.reducer';

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

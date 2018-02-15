import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';

import * as fromTodos from './todos.reducer';
import { TodosEffects } from './todos.effects';
import { TodosService } from './todos.service';
import { TodoExistsGuard } from './todos-exist.guard';
import { TodosListComponent } from './containers/todos-list';
import { TodosViewComponent } from './containers/todos-view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: TodosListComponent },
      {
        path: ':id',
        component: TodosViewComponent,
        canActivate: [TodoExistsGuard]
      }
    ]),
    StoreModule.forFeature('todos', fromTodos.reducer),
    EffectsModule.forFeature([TodosEffects]),
  ],
  declarations: [
    TodosListComponent,
    TodosViewComponent
  ],
  providers: [
    TodosService,
    TodoExistsGuard
  ]
})
export class TodosModule { }

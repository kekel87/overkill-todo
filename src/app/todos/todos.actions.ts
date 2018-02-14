import { Action } from '@ngrx/store';
import { Todo } from './todo';

export enum TodosActionTypes {
  Load = '[Todos] Load',
  LoadSuccess = '[Todos] Load Success',
  LoadFail = '[Todos] Load Fail'
}

export class Load implements Action {
  readonly type = TodosActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = TodosActionTypes.LoadSuccess;

  constructor(public payload: Todo[]) { }
}

export class LoadFail implements Action {
  readonly type = TodosActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export type TodosActions =
  | Load
  | LoadSuccess
  | LoadFail;

import { Action } from '@ngrx/store';
import { Todo } from './todo';

export enum TodosActionTypes {
  Load = '[Todos] Load',
  LoadSuccess = '[Todos] Load Success',
  LoadFail = '[Todos] Load Fail',
  Save = '[Todos] Save',
  SaveSuccess = '[Todos] Save Success',
  SaveFail = '[Todos] Save Fail',
  Select = '[Todos] Select',
}

export class Load implements Action {
  readonly type = TodosActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = TodosActionTypes.LoadSuccess;

  constructor(public todos: Todo[]) { }
}

export class LoadFail implements Action {
  readonly type = TodosActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class Save implements Action {
  readonly type = TodosActionTypes.Save;

  constructor(public todo: Todo) { }
}

export class SaveSuccess implements Action {
  readonly type = TodosActionTypes.SaveSuccess;

  constructor(public todo: Todo) { }
}

export class SaveFail implements Action {
  readonly type = TodosActionTypes.SaveFail;

  constructor(public payload: any) { }
}

export class Select implements Action {
  readonly type = TodosActionTypes.Select;

  constructor(public todoId: string) { }
}

export type TodosActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Save
  | SaveSuccess
  | SaveFail
  | Select;

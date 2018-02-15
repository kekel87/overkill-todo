import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Todo } from './todo';
import { TodosActions, TodosActionTypes } from './todos.actions';

export interface State extends EntityState<Todo> {
  loading: boolean;
  microLoading: boolean;
}

export function sortByStateAndId(a: Todo, b: Todo): number {
  return a.state === b.state
    ? a.id - b.id
    : b.state
      ? -1
      : 1;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: sortByStateAndId
});

// Initial state
export const initialState: State = adapter.getInitialState({
  loading: false,
  microLoading: false
});

export function reducer(
  state = initialState,
  action: TodosActions
): State {
  switch (action.type) {

    case TodosActionTypes.Load: {
      return adapter.getInitialState({
        ...state,
        loading: true
      });
    }

    case TodosActionTypes.LoadSuccess: {
      return adapter.addMany(action.todos, {
        ...state,
        loading: false
      });
    }

    case TodosActionTypes.LoadFail: {
      return {
        ...state,
        loading: false
      };
    }

    case TodosActionTypes.Save: {
      return {
        ...state,
        microLoading: true
      };
    }

    case TodosActionTypes.SaveSuccess: {
      return adapter.upsertOne({
        id: action.todo.id,
        changes: action.todo,
      }, {
          ...state,
          microLoading: false
        });
    }

    case TodosActionTypes.SaveFail: {
      return {
        ...state,
        microLoading: false
      };
    }

    default: {
      return state;
    }
  }
}

// Default selectors
export const getTodosLoading = (state: State) => state.loading;
export const getTodosMicroLoading = (state: State) => state.microLoading;

export const getTodosState = createFeatureSelector<State>('todos');

export const selectTodosLoading = createSelector(getTodosState, getTodosLoading);
export const selectTodosMicroLoading = createSelector(getTodosState, getTodosMicroLoading);

export const { selectAll: selectAllTodos } = adapter.getSelectors(
  getTodosState
);

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Todo } from './todo';
import { TodosActions, TodosActionTypes } from './todos.actions';

export interface State extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

// Initial state
export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false
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
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    default: {
      return state;
    }
  }
}

// Default selectors
export const getTodosLoading = (state: State) => state.loading;

export const getTodosState = createFeatureSelector<State>('todos');

export const selectTodosLoading = createSelector(getTodosState, getTodosLoading);

export const { selectAll: selectAllTodos } = adapter.getSelectors(
  getTodosState
);

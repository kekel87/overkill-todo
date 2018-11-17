import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Todo } from './todo';
import { TodosActions, TodosActionTypes } from './todos.actions';

export interface State extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
  microLoading: boolean;
  selectedTodoId: string | number | null;
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
  loaded: false,
  microLoading: false,
  selectedTodoId: null
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
        loading: false,
        loaded: true
      });
    }

    case TodosActionTypes.LoadFail: {
      return { ...state, loading: false };
    }

    case TodosActionTypes.Save: {
      return { ...state, microLoading: true };
    }

    case TodosActionTypes.SaveSuccess: {
      return adapter.upsertOne(action.todo, {
        ...state,
        microLoading: false
      });
    }

    case TodosActionTypes.SaveFail: {
      return { ...state, microLoading: false };
    }

    case TodosActionTypes.Select: {
      return { ...state, selectedTodoId: action.todoId };
    }

    default: {
      return state;
    }
  }
}

// Selectors
export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodosEntities,
  selectAll: selectAllTodos,
  selectTotal: todosCount
} = adapter.getSelectors();

export const getTodosState = createFeatureSelector<State>('todos');

export const getTodosIds = createSelector(getTodosState, selectTodoIds);
export const getTodosEntities = createSelector(getTodosState, selectTodosEntities);
export const getAllTodos = createSelector(getTodosState, selectAllTodos);
export const getCount = createSelector(getTodosState, todosCount);

export const getTodosLoading = createSelector(getTodosState, (state: State) => state.loading);
export const getTodosLoaded = createSelector(getTodosState, (state: State) => state.loaded);
export const getTodosMicroLoading = createSelector(getTodosState, (state: State) => state.microLoading);
export const getselectedTodoId = createSelector(getTodosState, (state: State) => state.selectedTodoId);

export const getCurrentTodo = createSelector(
  getTodosEntities,
  getselectedTodoId,
  (entities, todoId) => entities[todoId]
);

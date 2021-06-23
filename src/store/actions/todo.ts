import {
  FetchTodosAction,
  FetchTodosErrorAction,
  FetchTodosSuccessAction,
  Todo,
  TodoActionTypes,
} from '../types/todo';

const fetchTodosLoading = (): FetchTodosAction => ({
  type: TodoActionTypes.FETCH_TODOS,
});

const fetchTodosSuccess = (todos: Todo[]): FetchTodosSuccessAction => ({
  type: TodoActionTypes.FETCH_TODOS_SUCCESS,
  payload: todos,
});

const fetchTodosError = (error: string): FetchTodosErrorAction => ({
  type: TodoActionTypes.FETCH_TODOS_ERROR,
  payload: error,
});

export default { fetchTodosLoading, fetchTodosSuccess, fetchTodosError };

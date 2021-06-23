import { Action } from '.';

export enum TodoActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
}

export interface Todo {
  id: number;
  title: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: null | string;
  limit: number;
  page: number;
}

export interface FetchTodosAction extends Action {
  type: TodoActionTypes.FETCH_TODOS;
}

export interface FetchTodosSuccessAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS;
  payload: Todo[];
}

export interface FetchTodosErrorAction {
  type: TodoActionTypes.FETCH_TODOS_ERROR;
  payload: string;
}

export type TodoAction =
  | FetchTodosAction
  | FetchTodosSuccessAction
  | FetchTodosErrorAction;

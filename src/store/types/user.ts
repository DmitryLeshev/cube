import { Action } from '.';

export enum UserActionTypes {
  FETCH_USERS = '[user] loading data',
  FETCH_USERS_SUCCESS = '[user] data loaded successfully',
  FETCH_USERS_ERROR = '[user] error loading data',
  FETCH_USERS_SAGA = '[saga] user watcher',
}

export interface User {
  id: number;
  name: string;
  isOnline: boolean;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: null | string;
}

export interface FetchUsersActionSaga {
  type: UserActionTypes.FETCH_USERS_SAGA;
}

export interface FetchUsersAction extends Action {
  type: UserActionTypes.FETCH_USERS;
}

export interface FetchUsersSuccessAction {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: User[];
}

export interface FetchUsersErrorAction {
  type: UserActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

export type UserAction =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersErrorAction
  | FetchUsersActionSaga;

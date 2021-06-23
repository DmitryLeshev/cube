import {
  FetchUsersAction,
  FetchUsersActionSaga,
  FetchUsersErrorAction,
  FetchUsersSuccessAction,
  User,
  UserActionTypes,
} from '../types/user';

const fetchUsersLoading = (): FetchUsersAction => ({
  type: UserActionTypes.FETCH_USERS,
});

const fetchUsersSuccess = (users: User[]): FetchUsersSuccessAction => ({
  type: UserActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersError = (error: string): FetchUsersErrorAction => ({
  type: UserActionTypes.FETCH_USERS_ERROR,
  payload: error,
});

const fetchUsersSaga = (): FetchUsersActionSaga => ({
  type: UserActionTypes.FETCH_USERS_SAGA,
});

export default {
  fetchUsersLoading,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUsersSaga,
};

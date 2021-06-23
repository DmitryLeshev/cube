// import axios from "axios";
import { Dispatch } from 'react';

import actions from '../actions';
import { User, UserAction } from '../types/user';

const { fetchUsersError, fetchUsersLoading, fetchUsersSuccess } = actions.user;

export const fetchUsers = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch(fetchUsersLoading());
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/users"
    // );
    const response = { data: [] };
    const users: User[] = response.data;
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersError('Произошла ошибка при загрузке пользователей'));
  }
};

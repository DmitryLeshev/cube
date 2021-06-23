// import axios from "axios";
import { Dispatch } from 'react';

import actions from '../actions';
import { RootState } from '../reducers';
import { Todo, TodoAction } from '../types/todo';

// import dependencies from "../../../dependencies";
// const axios = dependencies.axios;
const { fetchTodosError, fetchTodosLoading, fetchTodosSuccess } = actions.todo;

export const fetchTodos = () => async (
  dispatch: Dispatch<TodoAction>,
  getState: () => RootState,
) => {
  try {
    dispatch(fetchTodosLoading());
    const { limit, page } = getState().todos;
    // const response = await axios.get(
    //   `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`
    // );
    const response = { data: [] };
    const todos: Todo[] = response.data;
    dispatch(fetchTodosSuccess(todos));
  } catch (error) {
    dispatch(fetchTodosError('Произошла ошибка при загрузке задач'));
  }
};

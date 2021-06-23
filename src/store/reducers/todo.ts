import { TodoAction, TodoActionTypes, TodoState } from '../types/todo';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  limit: 20,
  page: 1,
};

export const todosReducer = (state = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS:
      return { ...state, loading: true };

    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        page: ++state.page,
        todos: [...state.todos, ...action.payload],
      };

    case TodoActionTypes.FETCH_TODOS_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

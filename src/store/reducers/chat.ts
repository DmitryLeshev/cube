import types from '../types/chat';

const initionState = {
  users: [],
  messages: [],
};

export const chatReducer = (state = initionState, action: any) => {
  switch (action.type) {
    case types.GET_DATA:
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };

    case types.RESET:
      return initionState;

    default:
      return state;
  }
};

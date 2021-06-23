import types from "./types";

import dependencies from "../dependencies";

const { api } = dependencies;

const chatReset = () => ({
  type: types.RESET,
});

const chatFetchData = ({ id, controller }) => async (dispatch, _getState) => {
  const res = await api[controller].getMessages({ id });
  dispatch({
    type: types.GET_DATA,
    payload: {
      users: Object.keys(res.msg.users).map((id) => ({
        id: Number(id),
        ...res.msg.users[id],
      })),
      messages: res.msg.messages,
    },
  });
};

const chatSendMessage = ({ id, message, controller }) => async (dispatch) => {
  await api[controller].sendMessage({ id, message });
  dispatch(chatFetchData({ id, controller }));
};

export default {
  chatFetchData,
  chatSendMessage,
  chatReset,
};

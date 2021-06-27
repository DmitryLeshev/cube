import types from './types';

import dependencies from '../dependencies';

const { api } = dependencies;

const chatReset = () => ({
  type: types.RESET,
});

const chatFetchData = ({ id, controller }: any) => async (
  dispatch: any,
  _getState: any,
) => {
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

const chatSendMessage = ({ id, message, controller }: any) => async (dispatch: any) => {
  await api[controller].sendMessage({ id, message });
  dispatch(chatFetchData({ id, controller }));
};

export default {
  chatFetchData,
  chatSendMessage,
  chatReset,
};

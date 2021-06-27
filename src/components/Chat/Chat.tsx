import React, { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router';

import {
  Avatar,
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { useActions, useInput, useTypedSelector } from '@/hooks';

import { transformDate } from '@/utils/transformDate';

export default () => {
  const classes = useStyles();
  const { users, messages } = useTypedSelector((state) => state.chat);
  const { chatFetchData, chatReset, chatSendMessage } = useActions();
  const {
    url,
    params: { taskId: id },
  } = useRouteMatch<{ taskId: string }>();
  const message = useInput({ initialValue: '' });

  const controller = !!url.split('/').find((el) => el === 'incident')
    ? 'incident'
    : 'task';

  const parentRef = useRef(null);

  useEffect(() => {
    chatFetchData({ id, controller });
    scrollToBottom();
    return () => {
      chatReset();
    };
  }, []);

  function sendMessage(e: any) {
    e.preventDefault();
    if (message.value.trim() === '') return;
    chatSendMessage({ id, message: message.value, controller });
    message.onChange();
  }

  function scrollToBottom() {}

  const UserAvatar = ({ base64, alt, className }: any) => (
    <Avatar>
      <img
        className={className}
        src={`data:image/jpeg;base64, ${base64}`}
        alt={alt || 'avatar'}
      />
    </Avatar>
  );

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.messages}>
          {messages.map((message: any, idx: any) => {
            const user = users.find((user: any) => user.id === message.user_id);

            const avatarProps = {
              base64: user.avatar,
              className: classes.avatar,
              alt: user.login,
            };

            return (
              <div key={idx} className={classes.message}>
                <UserAvatar {...avatarProps} />
                <Typography variant="body1" className={classes.messageText}>
                  <span className={classes.user}>
                    {user.firstname || user.lastname
                      ? `${user.firstname} ${user.lastname}`
                      : user.login}
                  </span>
                  {message.msg}
                </Typography>
                <span className={classes.time}>
                  {transformDate(message.tst, 'hh:mm')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <Divider />
      <Paper
        component="form"
        square
        className={classes.root}
        onSubmit={sendMessage}
        onKeyPress={(e) => {
          if (!e.nativeEvent.shiftKey && e.nativeEvent.keyCode === 13) {
            sendMessage(e);
          }
        }}>
        <InputBase
          className={classes.input}
          placeholder="Написать сообщение..."
          multiline
          rowsMax={4}
          value=""
          onChange={(e) => console.log(e)}
          // {...message}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton type="submit" color="primary" className={classes.iconButton}>
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  messages: {
    display: 'flex',
    flexDirection: 'column-reverse',
    flexGrow: 1,
  },
  message: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 16,
  },
  avatar: {},
  user: {
    position: 'absolute',
    top: theme.spacing(-2.5),
    left: 0,
    fontWeight: 500,
  },
  messageText: {
    position: 'relative',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    width: '100%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  time: {
    position: 'absolute',
    bottom: 0,
    right: theme.spacing(2),
  },
  scrollbars: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

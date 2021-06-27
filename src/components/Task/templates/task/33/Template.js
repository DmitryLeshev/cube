import React, { useState, useEffect } from 'react';

import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import api from '../../../api';
import { useCustomSnackbar } from '../../../../../assets/hooks';
import { useParams } from 'react-router';

const RenderTextField = ({ id, items, setItems, addItem, removeItem }) => {
  const classes = useStyles();
  const [remove, setRemove] = useState(false);
  const [value, setValue] = useState('');
  const Icon = remove ? RemoveIcon : AddIcon;

  const handlerChange = (e) => {
    const value = e.target.value;
    setValue(value);
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    setItems(newItems);
  };

  const handleClickIcon = () => {
    if (items[items.length - 1].id === id) {
      return addItem();
    }
    removeItem(id);
  };

  useEffect(() => {
    setRemove(items[items.length - 1].id !== id);
  }, [id, items]);

  return (
    <FormControl className={classes.mb3} variant="outlined" size="small">
      <OutlinedInput
        type="text"
        value={value}
        onChange={handlerChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickIcon} size="small">
              <Icon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default ({ data, closeTask, children }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useCustomSnackbar();

  const { status } = useParams();
  const inWork = status === 'in-work';

  const initionState = [{ id: Math.random() + 1, value: '' }];
  const [items, setItems] = useState(initionState);
  const addItem = () => {
    const newItem = {
      id: Math.random() + 1,
      value: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    console.log(id);
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handlerButton = async (name, params = []) => {
    const res = await api.task.button.setDecision({
      id: data.id,
      action: name,
      params,
    });
    enqueueSnackbar(res, 'tasks');
    closeTask();
    setItems(initionState);
  };

  const loginList = (logins) => (
    <div>
      <h3> Введенные логины:</h3>
      {logins.split('\n').map((el, idx) => {
        return <p key={idx}>{el}</p>;
      })}
    </div>
  );

  const form = () => (
    <div className={classes.col}>
      {items.map((el, idx) => {
        return (
          <RenderTextField
            key={idx}
            id={el.id}
            value={el.value}
            items={items}
            addItem={addItem}
            removeItem={removeItem}
            setItems={setItems}
          />
        );
      })}
      {inWork && (
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={() => {
            let text = items.map((i) => {
              return i.value;
            });
            console.log(text.join('\n'));
            handlerButton('setLogins', { logins: text.join('\n') });
          }}>
          Отправить
        </Button>
      )}
    </div>
  );

  return (
    <>
      {children && children}
      <div>
        <p className={classes.text}>
          ip-адрес {data.body.ip}:{data.body.port}, протокол {data.body.protocol}
        </p>
      </div>
      {data.body.logins != null ? loginList(data.body.logins) : form()}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
  text: {
    ...theme.typography.h5,
    marginBottom: theme.spacing(2),
  },
  btn: {
    marginLeft: 'auto',
  },
}));

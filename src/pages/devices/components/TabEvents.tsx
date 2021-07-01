import React, { memo, useEffect, useState } from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { fetchData } from '@/utils';
import { Table } from '@/components';
import { ITheme } from '@/types/theme';

interface ITask {
  id: number;
  crt: number;
  type: number;
  class: number;
  tst: number;
  status: string;
  titleVars: string[];
}

interface Props {
  route: any;
  className: string;
}

export default memo(function TabEvents({ className }: Props) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  useEffect(() => {
    fetchData('user')({ getDeviceTasks: { mock: true } }).then((res) =>
      setTasks(res.msg),
    );
  }, []);

  const columns = [
    { field: 'type', headerName: 'Название', width: '60%' },
    { field: 'status', headerName: 'Статус', width: '20%' },
    { field: 'tst', headerName: 'Время создания', width: '20%' },
  ];

  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)}>
      <Table rows={tasks} columns={columns} />
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    container: {
      gridTemplateColumns: `1fr`,
      gridAutoRows: `auto`,
      paddingTop: theme.spacing(1.5),
    },
    icon: { marginLeft: 'auto' },
    btn: { marginRight: theme.spacing(2), '&:last-child': { marginRight: 0 } },
  }),
);

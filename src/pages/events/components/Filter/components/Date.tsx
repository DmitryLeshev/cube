import React from 'react';

import { DatePicker } from '@material-ui/pickers';

export default ({ classes, setDate, date, filter }: any) => (
  <div className={classes.dateWrapper}>
    <DatePicker
      autoOk
      size={'small'}
      variant="inline"
      inputVariant="outlined"
      label={filter.dateStart}
      format="dd.MM.yyyy"
      value={date[0]}
      onChange={(date) => setDate((prev: any) => [date, prev[1]])}
    />

    <DatePicker
      autoOk
      size={'small'}
      variant="inline"
      inputVariant="outlined"
      label={filter.dateEnd}
      format="dd.MM.yyyy"
      value={date[1]}
      onChange={(date) => setDate((prev: any) => [prev[0], date])}
    />
  </div>
);

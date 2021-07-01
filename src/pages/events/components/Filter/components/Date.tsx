import React from 'react';
import { Datepicker } from '@/ui/components';

export default ({ classes, setDate, date, filter }: any) => (
  <div className={classes.dateWrapper}>
    <Datepicker
      label={filter.dateStart}
      value={date[0]}
      onChange={(event) => setDate((prev: string) => [event.target.value, prev[1]])}
    />

    <Datepicker
      label={filter.dateEnd}
      value={date[1]}
      onChange={(event) => setDate((prev: string) => [prev[0], event.target.value])}
    />

    {/* <DatePicker
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
    /> */}
  </div>
);

import { useState } from 'react';

export default ({ initialValue }: any) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  function onChange(event?: React.ChangeEvent<HTMLInputElement>) {
    if (!event) return '';
    setValue(event.target.value);
  }

  function clear() {
    setValue('');
  }

  return {
    value,
    onChange,
  };
};

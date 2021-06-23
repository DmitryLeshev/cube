import { useState } from 'react';

interface Props {
  initialValue?: any;
}
export default ({ initialValue }: Props) => {
  const [value, setValue] = useState(initialValue);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
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

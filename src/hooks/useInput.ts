import { useState } from 'react';

export default ({
  initialValue,
  name,
  label,
}: {
  initialValue: string;
  name?: string;
  label?: string;
}) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  function onChange(event?: React.ChangeEvent<HTMLInputElement>) {
    if (!event) return setValue('');
    setValue(event.target.value);
  }

  return { value, onChange, name, label };
};

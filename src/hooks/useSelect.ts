import { IItemMenu } from '@/ui/components/Select';
import { useState } from 'react';

interface Props {
  items: IItemMenu[];
  selectedValue?: number;
  label?: string;
}

export default (props: Props) => {
  const [value, setValue] = useState<number>(props.selectedValue ?? 0);

  function onChange(event: React.ChangeEvent<{ value: number }>) {
    setValue(event.target.value);
  }

  return { value, onChange, items: props.items, label: props.label };
};

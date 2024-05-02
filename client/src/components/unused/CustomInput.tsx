import {
  FormControl,
  FormControlProps,
  Input,
  InputLabel
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

type CustomInputProps = {
  defaultValue?: string;
  value: string;
  label: string;
  name: string;
  hasErrors: boolean;
  type?: string;
  placeholder: string;
  validateField: () => void;
  onChange: (value: string) => void | Promise<void>;
};

export function CustomInput(
  props: CustomInputProps & Omit<FormControlProps, 'onChange'>
) {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const {
    defaultValue,
    label,
    type,
    hasErrors,
    value,
    placeholder,
    onChange,
    validateField,
    name,
    ...rest
  } = props;

  useEffect(() => {
    if (value) {
      setIsTouched(true);
      validateField();
    }
  }, [props.value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (isTouched) {
      validateField();
    }

    return onChange(e.target.value);
  }

  function handleBlur() {
    if (isTouched) {
      validateField();
    }

    setIsTouched(true);
  }

  return (
    <FormControl defaultValue={defaultValue} {...rest}>
      <InputLabel sx={{ color: hasErrors ? 'red !important' : 'unset' }}>
        {label}
      </InputLabel>
      <Input
        placeholder={placeholder}
        value={value}
        name=''
        type={type ? type : 'text'}
        onChange={handleChange}
        onBlur={handleBlur}
        error={hasErrors}
      />
    </FormControl>
  );
}

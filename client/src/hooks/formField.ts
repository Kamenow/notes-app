import { useEffect, useState } from 'react';

type ValidatorFunction = (value: string) => string;
// type ValidatorFunction = (value: string) => boolean;

type FormFieldProps = {
  value: string;
  error: string;
  isTouched: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  setError: (error: string) => void;
};

const useFormField = (
  initialValue: string,
  validator: ValidatorFunction
): FormFieldProps => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (initialValue && error) {
      setIsTouched(true);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setValue(newValue);

    if (isTouched || error) {
      setError(validator(newValue));
    }
  };

  const handleBlur = (): void => {
    setIsTouched(true);
    setError(validator(value));
  };

  const setCustomError = (customError: string): void => {
    setError(customError);
  };

  return {
    value,
    error,
    isTouched,
    handleChange,
    handleBlur,
    setError: setCustomError
  };
};

export default useFormField;

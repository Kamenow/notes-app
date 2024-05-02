import { Button, Typography } from '@mui/material';
import { isEmailValid, isPasswordValid } from '../../helpers/validation';
import { FormEvent, useMemo, useState } from 'react';
import { CustomInput } from './CustomInput';
import { RegisterFormDataType, RegisterFormErrors } from '../../types/formData';
import useAuth from '../../hooks/auth';
import { formContainerStyle } from '../Auth/style';

function RegisterForm(props: { switchForm: () => void }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormDataType>({
    email: '',
    password: '',
    rePassword: ''
  });
  const [formError, setFormError] = useState<RegisterFormErrors>({
    email: false,
    password: false,
    rePassword: false
  });

  const hasError = useMemo(() => {
    return Object.values(formError).some((error) => error);
  }, [formError.email, formError.password, formError.rePassword]);

  function handleChange(fieldName: string, value: string) {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  }

  function handleValidation(fieldName: string, isValid: boolean): void {
    setFormError({ ...formError, [fieldName]: !isValid });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await register(formData);
    } catch (error) {
      setFormError({ email: true, password: true, rePassword: true });
    }
  }

  return (
    <form style={formContainerStyle} onSubmit={handleSubmit}>
      <Typography>Register</Typography>
      {(formError.email || formError.password) && (
        <Typography color='red' fontSize='0.6rem'>
          Wrong Credentials
        </Typography>
      )}

      <CustomInput
        label='Email'
        placeholder='Email'
        name='email'
        validateField={handleValidation.bind(
          undefined,
          'email',
          isEmailValid(formData.email)
        )}
        hasErrors={formError.email}
        onChange={handleChange.bind(undefined, 'email')}
        value={formData.email}
        type='email'
        required
      />
      <CustomInput
        label='Password'
        name='password'
        placeholder='Password'
        value={formData.password}
        hasErrors={formError.password}
        onChange={handleChange.bind(undefined, 'password')}
        validateField={handleValidation.bind(
          undefined,
          'password',
          isPasswordValid(formData.password)
        )}
        type='password'
        required
      />
      <CustomInput
        label='rePassword'
        name='rePassword'
        placeholder='rePassword'
        value={formData.rePassword}
        hasErrors={formError.rePassword}
        onChange={handleChange.bind(undefined, 'rePassword')}
        validateField={handleValidation.bind(
          undefined,
          'rePassword',
          isPasswordValid(formData.rePassword)
        )}
        type='password'
        required
      />

      <Button disabled={hasError} type='submit'>
        Submit
      </Button>

      <Button
        variant='text'
        sx={{ fontSize: '0.5rem', color: 'black' }}
        onClick={props.switchForm}
      >
        Already have an account?
      </Button>
    </form>
  );
}

export default RegisterForm;

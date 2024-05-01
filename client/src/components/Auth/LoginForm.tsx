import { Button, Typography } from '@mui/material';
import { isEmailValid, isPasswordValid } from '../../helpers/validation';
import { FormEvent, useMemo, useState } from 'react';
import { CustomInput } from '../common/CustomInput';
import { LoginFormDataType, LoginFormErrors } from '../../types/formData';
import useAuth from '../../hooks/auth';
import { formContainerStyle } from './style';
import { useNavigate } from 'react-router-dom';

function LoginForm(props: { switchForm: () => void }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState<LoginFormErrors>({
    email: false,
    password: false
  });

  const hasError = useMemo(() => {
    return Object.values(formError).some((error) => error);
  }, [formError.email, formError.password]);

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
      await login(formData);
      navigate('/notes');
    } catch (error) {
      setFormError({ email: true, password: true });
    }
  }

  return (
    <form style={formContainerStyle} onSubmit={handleSubmit}>
      <Typography>Login</Typography>
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

      <Button disabled={hasError} type='submit'>
        Submit
      </Button>

      <Button
        variant='text'
        sx={{ fontSize: '0.5rem', color: 'black' }}
        onClick={props.switchForm}
      >
        Don't have an account?
      </Button>
    </form>
  );
}

export default LoginForm;

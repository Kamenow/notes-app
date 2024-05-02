import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { formContainerStyle } from './style';
import useFormField from '../../hooks/formField';
import { isEmailValid, isPasswordValid } from '../../helpers/validation';
import useAuth from '../../hooks/auth';
import CustomInput from '../common/CustomInput';
import { setErrors } from '../../helpers/errorHandling';

function LoginForm(props: { switchForm: () => void }) {
  const {
    error: emailError,
    handleBlur: emailHandleBlur,
    handleChange: emailHandleChange,
    value: EmailValue,
    setError: setEmailError
  } = useFormField('', isEmailValid);

  const {
    error: passworError,
    handleBlur: passwordHandleBlur,
    handleChange: passwordHandleChange,
    value: passwordValue,
    setError: setPasswordError
  } = useFormField('', isPasswordValid);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login({ email: EmailValue, password: passwordValue });
      navigate('/notes');
    } catch (error: any) {
      setErrors(error, [
        {
          fieldName: 'email',
          setFieldError: setEmailError
        },
        {
          fieldName: 'password',
          setFieldError: setPasswordError
        }
      ]);
    }
  }

  return (
    <form style={formContainerStyle} onSubmit={handleSubmit}>
      <Typography>Login</Typography>

      <CustomInput
        error={emailError}
        handleBlur={emailHandleBlur}
        handleChange={emailHandleChange}
        value={EmailValue}
        required={true}
        type='email'
        label='email'
      />
      <CustomInput
        error={passworError}
        handleBlur={passwordHandleBlur}
        handleChange={passwordHandleChange}
        value={passwordValue}
        required={true}
        type='password'
        label='password'
      />

      <Button disabled={false} type='submit'>
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

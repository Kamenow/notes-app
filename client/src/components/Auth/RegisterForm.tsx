import { FormEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { formContainerStyle } from './style';
import useFormField from '../../hooks/formField';
import { isEmailValid, isPasswordValid } from '../../helpers/validation';
import CustomInput from '../common/CustomInput';
import useAuth from '../../hooks/auth';
import { setErrors } from '../../helpers/errorHandling';

function RegisterForm(props: { switchForm: () => void }) {
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

  const {
    error: rePassworError,
    handleBlur: rePasswordHandleBlur,
    handleChange: rePasswordHandleChange,
    value: rePasswordValue,
    setError: setRePasswordError
  } = useFormField('', isPasswordValid);

  const { register } = useAuth();
  const navigate = useNavigate();

  const hasError = useMemo(
    () =>
      emailError.length > 0 ||
      passworError.length > 0 ||
      rePassworError.length > 0,
    [emailError, passworError, rePassworError]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await register({
        email: EmailValue,
        password: passwordValue,
        rePassword: rePasswordValue
      });
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
        },
        {
          fieldName: 'rePassword',
          setFieldError: setRePasswordError
        }
      ]);
    }
  }

  return (
    <form style={formContainerStyle} onSubmit={handleSubmit}>
      <Typography>Register</Typography>

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
      <CustomInput
        error={rePassworError}
        handleBlur={rePasswordHandleBlur}
        handleChange={rePasswordHandleChange}
        value={rePasswordValue}
        required={true}
        type='password'
        label='rePassword'
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

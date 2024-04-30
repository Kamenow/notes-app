import {
  Button,
  Container,
  FormControl,
  FormControlProps,
  Input,
  InputLabel,
  Typography
} from '@mui/material';
import {
  CSSProperties,
  ChangeEvent,
  FormEvent,
  useCallback,
  useState
} from 'react';
import { isEmailValid, isPasswordValid } from '../helpers/validation';

type CustomInputProps = {
  defaultValue?: string;
  label: string;
  name: string;
  placeholder: string;
  validateField: (value: string) => boolean;
};

function CustomInput(props: CustomInputProps & FormControlProps) {
  const [fieldValue, setFieldValue] = useState<string>('');
  const [isFieldValid, setIsFieldValid] = useState<boolean | undefined>(
    undefined
  );
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const { defaultValue, label, placeholder, validateField, name, ...rest } =
    props;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (isTouched) {
      setIsFieldValid(validateField(e.target.value));
    }

    setIsTouched(true);
    setFieldValue(e.target.value);
  }

  function handleBlur() {
    if (isTouched) {
      setIsFieldValid(validateField(fieldValue));
    }
  }

  const hasError = useCallback((): boolean => {
    return isTouched && !isFieldValid;
  }, [isTouched, isFieldValid]);

  return (
    <FormControl defaultValue={defaultValue} {...rest}>
      <InputLabel sx={{ color: hasError() ? 'red !important' : 'unset' }}>
        {label}
      </InputLabel>
      <Input
        placeholder={placeholder}
        value={fieldValue}
        name=''
        onChange={handleChange}
        onBlur={handleBlur}
        error={hasError()}
      />
    </FormControl>
  );
}

const formContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  borderTop: '2px solid black',
  borderLeft: '2px solid black',
  padding: '1rem',
  borderRadius: '1rem',
  maxWidth: '480px',
  boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)'
};

function Auth() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <form
        style={formContainerStyle}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
        }}
      >
        <Typography>Login</Typography>

        <CustomInput
          label='Email'
          placeholder='Email'
          name='email'
          required
          validateField={isEmailValid}
        />
        <CustomInput
          label='Password'
          name='password'
          placeholder='Password'
          // TODO: connect to repeat password field
          validateField={isPasswordValid}
          required
        />
        <CustomInput
          label='Repeat Password'
          name='re-password'
          placeholder='Repeat Password'
          // TODO: connect to password field
          validateField={isPasswordValid}
          required
        />

        <Button type='submit'>Submit</Button>

        {/* <Typography fontSize='15px'>Already have an account?</Typography>
        <Typography fontSize='15px'>Don't have an account?</Typography> */}
      </form>
    </Container>
  );
}

export default Auth;

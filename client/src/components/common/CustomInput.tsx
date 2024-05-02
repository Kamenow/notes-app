import {
  FormControl,
  FormControlProps,
  Input,
  InputLabel,
  Typography
} from '@mui/material';

type TestInputType = {
  value: string;
  error: string;
  label: string;
  type?: string;
  required?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
};

function CustomInput(props: TestInputType) {
  return (
    <FormControl required={props.required}>
      <InputLabel sx={{ color: props.error ? 'red !important' : 'unset' }}>
        {props.label}
      </InputLabel>
      <Input
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={props.error.length > 0}
        type={props.type ?? 'text'}
      />
      <Typography color='red' fontSize='15px'>
        {props.error}
      </Typography>
    </FormControl>
  );
}

export default CustomInput;

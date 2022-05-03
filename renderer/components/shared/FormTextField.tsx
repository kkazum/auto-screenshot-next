import { FormControl, Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { StandardTextFieldProps } from '@mui/material/TextField/TextField';
import { Control, Path, RegisterOptions, useController } from 'react-hook-form';

export interface TextFieldProps extends StandardTextFieldProps {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  control?: Control<any>;
  name?: Path<any>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  valueAsNumber?: boolean;
}

const StTextField: React.VFC<TextFieldProps> = (props) => {
  const { name, control, rules, valueAsNumber, ...textFieldProps } = props;
  const {
    field: { ref, onChange, ...rest },
  } = useController({ name: name || '', control, rules });

  return (
    <TextField
      inputRef={ref}
      {...rest}
      {...textFieldProps}
      onChange={(e) => {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: valueAsNumber ? parseInt(e.target.value, 10) || '' : e.target.value,
          },
        });
      }}
    />
  );
};

export const FormTextField: React.VFC<TextFieldProps> = ({
  label,
  error = false,
  errorMessage = '',
  ...textFieldProps
}) => {
  return (
    <>
      <FormControl variant="standard" error={error} fullWidth>
        {label && (
          <Box
            sx={{
              color: '#000000DE',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {label}
          </Box>
        )}
        <StTextField {...textFieldProps} />
        {error && (
          <FormHelperText sx={{ fontSize: 14, fontWeight: '700' }}>
            <Box>{errorMessage}</Box>
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

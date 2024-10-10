// Libraries
import { forwardRef } from 'react';

// Design System
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';

interface TextInputProps extends InputProps {
  label: string;
  errorMessage: string;
}

const FormTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { id, label, errorMessage, ...rest } = props;
    return (
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input ref={ref} id={id} {...rest} />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default FormTextInput;

// Libraries
import { forwardRef } from 'react';

// Design System
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';

interface OwnTextareaProps extends TextareaProps {
  label: string;
  errorMessage: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, OwnTextareaProps>(
  (props, ref) => {
    const { id, label, errorMessage, ...rest } = props;
    return (
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Textarea ref={ref} id={id} {...rest} />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default FormTextarea;

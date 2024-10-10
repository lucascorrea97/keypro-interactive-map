// Design System
import { Button, ButtonProps } from '@chakra-ui/react';

// Styles
import useButtonStyles from './button.styles';

// Types
import { OwnButtonVariants } from './button.types';

interface OwnButtonProps extends ButtonProps {
  variant?: OwnButtonVariants;
}

const OwnButton = ({ variant = 'primary', ...props }: OwnButtonProps) => {
  const buttonStyles = useButtonStyles({ variant });
  return <Button variant={variant} {...props} {...buttonStyles} />;
};

export default OwnButton;

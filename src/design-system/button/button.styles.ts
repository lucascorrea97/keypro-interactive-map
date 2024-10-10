// Types
import { ButtonProps } from '@chakra-ui/react';
import { OwnButtonVariants } from './button.types';

const defaultStyles = {
  _hover: {
    transform: 'scale(0.98)',
  },
};

const getVariantProps = ({ variant }: { variant: OwnButtonVariants }) => {
  const variants: Record<OwnButtonVariants, ButtonProps> = {
    primary: {
      ...defaultStyles,
      backgroundColor: 'buttonPrimaryBackground',
      borderColor: 'buttonPrimaryBorderColor',
      border: '1px solid',
      color: 'buttonPrimaryTextColor',
      variant: 'solid',
    },
    secondary: {
      ...defaultStyles,
      backgroundColor: 'buttonSecondaryBackground',
      borderColor: 'buttonSecondaryBorderColor',
      color: 'buttonSecondaryTextColor',
      border: '1px solid',
      variant: 'solid',
    },
    dismiss: {
      ...defaultStyles,
      backgroundColor: 'buttonDismissBackground',
      borderColor: 'buttonDismissBorderColor',
      color: 'buttonDismissTextColor',
      variant: 'ghost',
    },
    conversion: {
      backgroundColor: 'buttonConversionBackground',
      borderColor: 'buttonConversionBorderColor',
      color: 'buttonConversionTextColor',
      border: '1px solid',
      variant: 'solid',
    },
  };
  return variants[variant];
};

const useButtonStyles = ({
  variant,
}: {
  variant: OwnButtonVariants;
}): ButtonProps => {
  const variantProps = getVariantProps({ variant });
  return { ...variantProps };
};

export default useButtonStyles;

// Design System
import { extendTheme } from '@chakra-ui/react';

const alizarinCrimson = '#DA291C';
const white = '#fff';
const eden = '#0D5257';
const nightRider = '#333333';

const theme = extendTheme({
  semanticTokens: {
    colors: {
      buttonPrimaryBackground: white,
      buttonPrimaryTextColor: eden,
      buttonPrimaryBorderColor: eden,
      buttonSecondaryBackground: white,
      buttonSecondaryTextColor: alizarinCrimson,
      buttonSecondaryBorderColor: alizarinCrimson,
      buttonDismissBackgroundColor: white,
      buttonDismissTextColor: nightRider,
      buttonConversionBackground: eden,
      buttonConversionTextColor: white,
      buttonConversionBorderColor: white,
      error: 'red.500',
      success: 'green.500',
      primary: {
        default: 'red.500',
        _dark: 'red.400',
      },
      secondary: {
        default: 'red.800',
        _dark: 'red.700',
      },
    },
  },
});

export default theme;

// Libraries
import { useEffect, useState, FormEvent } from 'react';

// Design System
import { Stack, Box, Text } from '@chakra-ui/react';
import { Button } from '../../../design-system';

// Containers
import FormTextInput from '../../../design-system/form-elements/form-text-input';

// Types
import { SignInData } from '../services/types/authentication.types';

interface SignInProps {
  onSignIn: (user: SignInData) => void;
  isInvalidCredential: boolean;
}

const SignIn = ({ onSignIn, isInvalidCredential }: SignInProps) => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isInvalidCredential) {
      setFormError('Invalid credentials');
    }
  }, [isInvalidCredential]);

  const resetErrors = () => {
    setEmailError('');
    setPasswordError('');
    setFormError('');
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    resetErrors();

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }

    if (isValid) {
      onSignIn({ email, password });
    } else {
      setFormError('Please fix the errors before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text fontSize="2xl" marginBottom={4}>
        Sign In
      </Text>
      <Stack spacing={4}>
        {formError && (
          <Box color="error" marginBottom={2}>
            {formError}
          </Box>
        )}
        <FormTextInput
          label="Email"
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          errorMessage={emailError}
        />
        <FormTextInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          errorMessage={passwordError}
        />
        <Button type="submit" variant="conversion">
          Sign in
        </Button>
      </Stack>
    </form>
  );
};

export default SignIn;

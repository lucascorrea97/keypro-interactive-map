// Libraries
import { FormEvent, useEffect, useState } from 'react';

// Design System
import { Stack, Box, Text } from '@chakra-ui/react';
import { Button } from '../../../design-system';

// Containers
import FormTextInput from '../../../design-system/form-elements/form-text-input';

// Types
import { SignUpData } from '../services/types/authentication.types';

interface SignUpProps {
  onSignUp: (data: SignUpData) => void;
  isEmailAlreadyInUse: boolean;
}

const SignUp = ({ onSignUp, isEmailAlreadyInUse }: SignUpProps) => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isEmailAlreadyInUse) {
      setFormError('Email already in use');
    }
  }, [isEmailAlreadyInUse]);

  const resetErrors = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setFormError('');
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    resetErrors();

    let isValid = true;

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

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    // If valid, submit the data
    if (isValid) {
      onSignUp({ email, password, confirmPassword });
    } else {
      setFormError('Please fix the errors before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text fontSize="2xl" marginBottom={4}>
        Sign Up
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
        <FormTextInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          errorMessage={confirmPasswordError}
        />
        <Button type="submit" variant="conversion">
          Sign up
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;

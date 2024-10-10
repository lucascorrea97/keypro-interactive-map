// Libraries
import { render, fireEvent } from '@testing-library/react';

// Components
import SignUp from '../sign-up';

const mockEmail = 'lucas@gmail.com';
const mockInvalidEmail = 'lucas';
const mockPassword = '12345678';
const mockInvalidPassword = '123';

describe('SignUp', () => {
  it('Successfully submits the sign up form', () => {
    const onSignUpMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <SignUp onSignUp={onSignUpMock} isEmailAlreadyInUse={false} />
    );

    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');

    // Trigger input udpates
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    fireEvent.change(confirmPasswordInput, { target: { value: mockPassword } });

    // Submits form
    const submitButton = getByText('Sign up');
    fireEvent.click(submitButton);

    // Asserts form submission
    expect(onSignUpMock).toHaveBeenCalledWith({
      email: mockEmail,
      password: mockPassword,
      confirmPassword: mockPassword,
    });
  });
  it('Triggers all error messages and email already in use error', () => {
    const onSignUpMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <SignUp onSignUp={onSignUpMock} isEmailAlreadyInUse />
    );

    // Checksemail already in use error message is displayed
    const isEmailAlreadyInUseErrorMessage = getByText('Email already in use');
    expect(isEmailAlreadyInUseErrorMessage).toBeDefined();

    // Submits form
    const submitButton = getByText('Sign up');
    fireEvent.click(submitButton);

    // Checks "is required" errors for email & password
    const emailRequiredError = getByText('Email is required');
    const passwordRequiredError = getByText('Password is required');
    const confirmPasswordRequiredError = getByText(
      'Please confirm your password'
    );

    // Asserts
    expect(emailRequiredError).toBeDefined();
    expect(passwordRequiredError).toBeDefined();
    expect(confirmPasswordRequiredError).toBeDefined();

    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');

    // Triggers input udpates with invalid email & password & different confirm password
    fireEvent.change(emailInput, { target: { value: mockInvalidEmail } });
    fireEvent.change(passwordInput, { target: { value: mockInvalidPassword } });
    fireEvent.change(confirmPasswordInput, { target: { value: mockPassword } });

    // Submits form again
    fireEvent.click(submitButton);

    // Checks invalid input errors for email & password
    const invalidEmailError = getByText('Please enter a valid email');
    const invalidPasswordError = getByText(
      'Password must be at least 6 characters long'
    );
    const invalidConfirmPasswordError = getByText('Passwords do not match');

    // Asserts
    expect(invalidEmailError).toBeDefined();
    expect(invalidPasswordError).toBeDefined();
    expect(invalidConfirmPasswordError).toBeDefined();
  });
});

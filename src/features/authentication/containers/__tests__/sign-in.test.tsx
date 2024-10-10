// Libraries
import { render, fireEvent } from '@testing-library/react';

// Components
import SignIn from '../sign-in';

const mockEmail = 'lucas@gmail.com';
const mockInvalidEmail = 'lucas';
const mockPassword = '12345678';
const mockInvalidPassword = '123';

describe('SignIn', () => {
  it('Successfully submits the sign in form', () => {
    const onSignInMock = jest.fn();
    const { getByLabelText, getByDisplayValue, getByText } = render(
      <SignIn onSignIn={onSignInMock} isInvalidCredential={false} />
    );

    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    // Trigger input udpates
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });

    // Gets updated inputs
    const updatedEmailInput = getByDisplayValue(mockEmail);
    const updatedPasswordInput = getByDisplayValue(mockPassword);

    // Asserts
    expect(updatedEmailInput).toBeDefined();
    expect(updatedPasswordInput).toBeDefined();

    // Submits form
    const submitButton = getByText('Sign in');
    fireEvent.click(submitButton);

    // Asserts form submission
    expect(onSignInMock).toHaveBeenCalledWith({
      email: mockEmail,
      password: mockPassword,
    });
  });
  it('Triggers all error messages and invalid credentials error', () => {
    const onSignInMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <SignIn onSignIn={onSignInMock} isInvalidCredential />
    );

    // Checks invalid credentials error message is displayed
    const invalidCredentialsErrorMessage = getByText('Invalid credentials');
    expect(invalidCredentialsErrorMessage).toBeDefined();

    // Submits form
    const submitButton = getByText('Sign in');
    fireEvent.click(submitButton);

    // Checks "is required" errors for email & password
    const emailRequiredError = getByText('Email is required');
    const passwordRequiredError = getByText('Password is required');

    // Asserts
    expect(emailRequiredError).toBeDefined();
    expect(passwordRequiredError).toBeDefined();

    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    // Triggers input udpates with invalid email & password
    fireEvent.change(emailInput, { target: { value: mockInvalidEmail } });
    fireEvent.change(passwordInput, { target: { value: mockInvalidPassword } });

    // Submits form again
    fireEvent.click(submitButton);

    // Checks invalid input errors for email & password
    const invalidEmailError = getByText('Please enter a valid email');
    const invalidPasswordError = getByText(
      'Password must be at least 6 characters long'
    );

    // Asserts
    expect(invalidEmailError).toBeDefined();
    expect(invalidPasswordError).toBeDefined();
  });
});

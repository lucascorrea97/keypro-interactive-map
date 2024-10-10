// Libraries
import { act, fireEvent, waitFor } from '@testing-library/react';

// Components
import Authentication from '../authentication';

// Utils
import { renderWithClient } from '../../../utils/testing-library.utils';

// Services
import { useLoginUser } from '../../services/mutations/use-login-user';
import { useCreateUser } from '../../services/mutations/use-create-user';

const mockEmail = 'lucas@gmail.com';
const mockPassword = '12345678';

const mockUser = { email: mockEmail, password: mockPassword };

// Mocks
const mockUseLoginUser = useLoginUser as jest.Mock;
jest.mock('../../services/mutations/use-login-user', () => ({
  useLoginUser: jest.fn(),
}));

const mockUseCreateUser = useCreateUser as jest.Mock;
jest.mock('../../services/mutations/use-create-user', () => ({
  useCreateUser: jest.fn(),
}));

describe('Authentication', () => {
  it('Completes sign up successfully', async () => {
    const onAuthenticationSuccessMock = jest.fn();
    mockUseLoginUser.mockReturnValue({
      loginUser: () => undefined,
    });
    mockUseCreateUser.mockReturnValue({
      createUser: () => mockUser,
    });

    const { getByLabelText, getByText, getAllByDisplayValue } = await act(
      async () => {
        return await renderWithClient(
          <Authentication
            onLogoutSuccess={() => null}
            onAuthenticationSuccess={onAuthenticationSuccessMock}
            authenticatedUser={undefined}
          />
        );
      }
    );
    // Tests navigation
    const signInButton = getByText('Sign in');
    fireEvent.click(signInButton);

    const signUpButton = getByText('Sign up');
    fireEvent.click(signUpButton);
    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');

    // Trigger input udpates
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, {
      target: { value: mockPassword },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockPassword },
    });

    // Submits form
    const submitButton = getByText('Sign up');
    await act(async () => {
      await fireEvent.click(submitButton);
    });

    // Checks the inputs are cleared and only two exist (email and password) as now the sign in form is active
    const clearedInputs = getAllByDisplayValue('');
    expect(clearedInputs).toHaveLength(2);
  });
  it('Signs up with a registered email', async () => {
    const onAuthenticationSuccessMock = jest.fn();
    mockUseLoginUser.mockReturnValue({
      loginUser: () => mockUser,
    });
    mockUseCreateUser.mockReturnValue({
      createUser: () => null,
    });
    const { getByLabelText, getByText, findByText } = await act(async () => {
      return await renderWithClient(
        <Authentication
          onLogoutSuccess={() => null}
          onAuthenticationSuccess={onAuthenticationSuccessMock}
          authenticatedUser={undefined}
        />
      );
    });

    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');

    // Trigger input udpates
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockPassword },
    });

    // Submits form
    const submitButton = getByText('Sign up');
    fireEvent.click(submitButton);

    const emailInUseError = await findByText('Email already in use');
    expect(emailInUseError).toBeDefined();
  });
  it('Signs in successfully', async () => {
    const onAuthenticationSuccessMock = jest.fn();
    mockUseLoginUser.mockReturnValue({
      loginUser: () => mockUser,
    });
    mockUseCreateUser.mockReturnValue({
      createUser: () => null,
    });

    const { getByLabelText, getByText } = await act(async () => {
      return await renderWithClient(
        <Authentication
          onLogoutSuccess={() => null}
          onAuthenticationSuccess={onAuthenticationSuccessMock}
          authenticatedUser={undefined}
        />
      );
    });

    const signInButton = getByText('Sign in');
    fireEvent.click(signInButton);

    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    // Trigger input udpates
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });

    // Submits form
    const submitButton = getByText('Sign in');
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onAuthenticationSuccessMock).toHaveBeenCalledWith(mockUser)
    );
  });
  it('Signs in with invalid credentials', async () => {
    const onAuthenticationSuccessMock = jest.fn();
    mockUseLoginUser.mockReturnValue({
      loginUser: () => null,
    });
    mockUseCreateUser.mockReturnValue({
      createUser: () => null,
    });

    const { getByLabelText, getByText, findByText } = await act(async () => {
      return await renderWithClient(
        <Authentication
          onLogoutSuccess={() => null}
          onAuthenticationSuccess={onAuthenticationSuccessMock}
          authenticatedUser={undefined}
        />
      );
    });

    const signInButton = getByText('Sign in');
    fireEvent.click(signInButton);

    // Elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    // Trigger input udpates
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });

    // Submits form
    const submitButton = getByText('Sign in');
    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(onAuthenticationSuccessMock).not.toHaveBeenCalled();
      const invalidCredentialsError = await findByText('Invalid credentials');
      expect(invalidCredentialsError).toBeDefined();
    });
  });
  it('Logs out authenticated user', async () => {
    const onAuthenticationSuccessMock = jest.fn();
    const onLogoutSuccessMock = jest.fn();
    mockUseLoginUser.mockReturnValue({
      loginUser: () => null,
    });
    mockUseCreateUser.mockReturnValue({
      createUser: () => null,
    });

    const { getByText } = await act(async () => {
      return await renderWithClient(
        <Authentication
          onLogoutSuccess={onLogoutSuccessMock}
          onAuthenticationSuccess={onAuthenticationSuccessMock}
          authenticatedUser={mockUser}
        />
      );
    });

    await act(async () => {
      const logOutButton = getByText('Log out');
      await fireEvent.click(logOutButton);
    });

    expect(onLogoutSuccessMock).toHaveBeenCalled();
  });
});

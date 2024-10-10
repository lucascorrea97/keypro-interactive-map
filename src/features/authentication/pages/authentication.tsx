// Libraries
import { useEffect, useState } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';

// Containers
import SignUp from '../containers/sign-up';
import SignIn from '../containers/sign-in';

// Hooks
import { useCreateUser } from '../services/mutations/use-create-user';
import { useLoginUser } from '../services/mutations/use-login-user';
import { useLogoutUser } from '../services/mutations/use-logout-user';

// Types
import { User } from '../services/types/user.types';
import { SignInData, SignUpData } from '../services/types/authentication.types';
import { Box, Button } from '../../../design-system';

interface AuthenticationProps {
  onAuthenticationSuccess: (user: User) => void;
  onLogoutSuccess: () => void;
  authenticatedUser?: User;
}

type AuthenticationFlow = 'Sign In' | 'Sign Up' | '';

const Authentication = ({
  onAuthenticationSuccess,
  onLogoutSuccess,
  authenticatedUser,
}: AuthenticationProps) => {
  const toast = useToast();
  const [selectedAuthenticationFlow, setSelectedAuthenticationFlow] =
    useState<AuthenticationFlow>('Sign Up');
  const [isInvalidCredential, setIsInvalidCredential] = useState(false);
  const [isEmailAlreadyInUse, setIsEmailAlreadyInUse] = useState(false);
  const [isReauthenticating, setIsReauthenticating] = useState(true);
  const { createUser } = useCreateUser();
  const { loginUser } = useLoginUser();
  const { logoutUser } = useLogoutUser();

  useEffect(() => {
    // Tries to automatically log in authenticated users
    const reAuthenticateUser = async () => {
      setIsReauthenticating(true);
      const loggedInUser = await loginUser();
      if (loggedInUser) {
        onAuthenticationSuccess(loggedInUser);
      }
      setIsReauthenticating(false);
    };
    reAuthenticateUser();
  }, []);

  const handleOnSignUp = async (signUpData: SignUpData) => {
    const newUser = await createUser(signUpData);
    if (newUser) {
      setSelectedAuthenticationFlow('Sign In');
      setIsEmailAlreadyInUse(false);
      toast({
        title: 'Account created.',
        description: "We've created your account for you. Please sign in.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setIsEmailAlreadyInUse(true);
    }
  };

  const handleOnSignIn = async (signInData: SignInData) => {
    const loggedInUser = await loginUser(signInData);
    if (loggedInUser) {
      setIsInvalidCredential(false);
      onAuthenticationSuccess(loggedInUser);
    } else {
      setIsInvalidCredential(true);
    }
  };

  const handleOnAuthenticationFlowSelection = (
    authenticationFlow: AuthenticationFlow
  ) => {
    setIsInvalidCredential(false);
    setIsEmailAlreadyInUse(false);
    setSelectedAuthenticationFlow(authenticationFlow);
  };

  const handleOnLogOut = async () => {
    if (authenticatedUser) {
      await logoutUser(authenticatedUser.email);
      onLogoutSuccess();
    }
  };

  const isSignUpFlowSelected = selectedAuthenticationFlow === 'Sign Up';

  return (
    <Box>
      {isReauthenticating ? (
        <Spinner />
      ) : (
        <Box>
          {authenticatedUser && (
            <Button
              position="absolute"
              top="16px"
              right="16px"
              zIndex={1}
              variant="dismiss"
              onClick={() => handleOnLogOut()}
            >
              Log out
            </Button>
          )}
          {!authenticatedUser && (
            <Box>
              {isSignUpFlowSelected ? (
                <SignUp
                  onSignUp={handleOnSignUp}
                  isEmailAlreadyInUse={isEmailAlreadyInUse}
                />
              ) : (
                <SignIn
                  onSignIn={handleOnSignIn}
                  isInvalidCredential={isInvalidCredential}
                />
              )}
              <Box marginTop={2}>
                {!isSignUpFlowSelected ? (
                  <Button
                    width="100%"
                    onClick={() =>
                      handleOnAuthenticationFlowSelection('Sign Up')
                    }
                  >
                    Sign up
                  </Button>
                ) : (
                  <Button
                    width="100%"
                    onClick={() =>
                      handleOnAuthenticationFlowSelection('Sign In')
                    }
                  >
                    Sign in
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Authentication;

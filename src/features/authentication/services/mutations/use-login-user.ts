// Libraries
import { useMutation } from 'react-query';

// API
import axiosInstance from '../../../../api/mocks/axios-instance';

// Types
import { SignInData } from '../../services/types/authentication.types';
import { User } from '../../services/types/user.types';

const LOGIN_USER_KEY = 'LOGIN_USER_KEY';

type LoginUserPromisePayload = SignInData;

const loginUserPromise = async (
  payload?: LoginUserPromisePayload
): Promise<void> => {
  const response = await axiosInstance.post(`/user-login`, {
    payload,
  });
  return response.data;
};

export const useLoginUser = () => {
  const { mutate, isLoading } = useMutation(LOGIN_USER_KEY, loginUserPromise);

  const loginUser = async (signInData?: SignInData) => {
    return new Promise<User>((resolve) => {
      mutate(signInData, {
        onSuccess: async (result) => {
          resolve(result as unknown as User);
        },
      });
    });
  };
  return {
    loginUser,
    isLoading,
  };
};

// Libraries
import { useMutation } from 'react-query';

// API
import axiosInstance from '../../../../api/mocks/axios-instance';

// Types
import { SignUpData } from '../types/authentication.types';
import { User } from '../types/user.types';

const CREATE_USER_KEY = 'CREATE_USER_KEY';

type CreateUserPromisePayload = SignUpData;

const createUserPromise = async (
  payload: CreateUserPromisePayload
): Promise<void> => {
  const response = await axiosInstance.post(`/user`, {
    payload,
  });
  return response.data;
};

export const useCreateUser = () => {
  const { mutate, isLoading } = useMutation(CREATE_USER_KEY, createUserPromise);

  const createUser = async (signUpData: SignUpData) => {
    return new Promise<User>((resolve) => {
      mutate(signUpData, {
        onSuccess: async (result) => {
          resolve(result as unknown as User);
        },
      });
    });
  };
  return {
    createUser,
    isLoading,
  };
};

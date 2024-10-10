// Libraries
import { useMutation } from 'react-query';

// API
import axiosInstance from '../../../../api/mocks/axios-instance';

const LOGOUT_USER_KEY = 'LOGOUT_USER_KEY';

const logoutUserPromise = async (payload: { email: string }): Promise<void> => {
  const response = await axiosInstance.post(`/user-logout`, { payload });
  return response.data;
};

export const useLogoutUser = () => {
  const { mutate, isLoading } = useMutation(LOGOUT_USER_KEY, logoutUserPromise);

  const logoutUser = async (email: string) => {
    mutate({ email });
  };
  return {
    logoutUser,
    isLoading,
  };
};

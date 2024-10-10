// Libraries
import { useMutation } from 'react-query';

// API
import axiosInstance from '../../../../api/mocks/axios-instance';

const DELETE_POINT_OF_INTEREST_KEY = 'DELETE_POINT_OF_INTEREST_KEY';

type DeletePointOfInterestPromisePayload = {
  id: string;
};

const deletePointOfInterestPromise = async (
  payload: DeletePointOfInterestPromisePayload
): Promise<void> => {
  await axiosInstance.delete(`/point-of-interest/${payload.id}`);
};

export const useDeletePointOfInterest = () => {
  const { mutate, isLoading } = useMutation(
    DELETE_POINT_OF_INTEREST_KEY,
    deletePointOfInterestPromise
  );

  const deletePointOfInterest = (id: string) => {
    const args: DeletePointOfInterestPromisePayload = {
      id,
    };
    mutate(args);
  };
  return {
    deletePointOfInterest,
    isLoading,
  };
};

// Libraries
import { useMutation } from 'react-query';

// API
import axiosInstance from '../../../../api/mocks/axios-instance';

// Types
import { PointOfInterest } from '../types/point-of-interest.types';

const UPDATE_POINT_OF_INTEREST_KEY = 'UPDATE_POINT_OF_INTEREST';

type UpdatePointOfInterestPromisePayload = {
  data: PointOfInterest;
};

const updatePointOfInterestPromise = async (
  payload: UpdatePointOfInterestPromisePayload
): Promise<PointOfInterest> => {
  const response = await axiosInstance.patch(
    `/point-of-interest/${payload.data.id}`,
    {
      payload,
    }
  );
  return response.data;
};

export const useUpdatePointOfInterest = () => {
  const { mutate, isLoading } = useMutation(
    UPDATE_POINT_OF_INTEREST_KEY,
    updatePointOfInterestPromise
  );

  const updatePointOfInterest = (data: PointOfInterest) => {
    const args: UpdatePointOfInterestPromisePayload = {
      data,
    };
    mutate(args);
  };
  return {
    updatePointOfInterest,
    isLoading,
  };
};

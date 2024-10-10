// Libraries
import { useMutation } from 'react-query';

// API
import axiosInstance from '../../../../api/mocks/axios-instance';

// Types
import { PointOfInterest } from '../types/point-of-interest.types';

const SAVE_POINT_OF_INTEREST_KEY = 'SAVE_POINT_OF_INTEREST';

type SavePointOfInterestPromisePayload = {
  data: PointOfInterest;
};

const savePointOfInterestPromise = async (
  payload: SavePointOfInterestPromisePayload
): Promise<PointOfInterest> => {
  const response = await axiosInstance.post('/point-of-interest', {
    payload,
  });
  return response.data;
};

export const useSavePointOfInterest = () => {
  const { mutate, isLoading } = useMutation(
    SAVE_POINT_OF_INTEREST_KEY,
    savePointOfInterestPromise
  );

  const savePointOfInterest = (data: PointOfInterest) => {
    const args: SavePointOfInterestPromisePayload = {
      data,
    };
    mutate(args);
  };
  return {
    savePointOfInterest,
    isLoading,
  };
};

// Libraries
import { useQuery } from 'react-query';

// API
import axiosInstance from '../../../../api/mocks/axios-instance';

// Types
import { PointOfInterest } from '../types/point-of-interest.types';

const QUERY_STALE_TIME = 1000 * 60 * 5; // Data is fresh for 5 minutes

const GET_POINTS_OF_INTEREST_QUERY_KEY = 'GET_POINTS_OF_INTEREST';

const fetchPointsOfInterest = async (): Promise<PointOfInterest[]> => {
  const response = await axiosInstance.get('/points-of-interest');
  return response.data;
};

export const useGetPointsOfInterest = () => {
  return useQuery(GET_POINTS_OF_INTEREST_QUERY_KEY, fetchPointsOfInterest, {
    staleTime: QUERY_STALE_TIME,
  });
};

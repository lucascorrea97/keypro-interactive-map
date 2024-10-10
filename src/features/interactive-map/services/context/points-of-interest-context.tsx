// Libraries
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// Hooks
import { useGetPointsOfInterest } from '../queries/use-get-points-of-interest';
import { useSavePointOfInterest } from '../mutations/use-save-point-of-interest';
import { useDeletePointOfInterest } from '../mutations/use-delete-point-of-interest';
import { useUpdatePointOfInterest } from '../mutations/use-update-point-of-interest';

// Types
import { PointOfInterest } from '../types/point-of-interest.types';

type PointsOfInterestContextProps = {
  pointsOfInterest: PointOfInterest[];
  updatePointOfInterest: (pointOfInterest: PointOfInterest) => void;
  deletePointOfInterest: (id: string) => void;
  createPointOfInterest: (pointOfInterest: PointOfInterest) => void;
};

const defaultContext: PointsOfInterestContextProps = {
  pointsOfInterest: [],
  updatePointOfInterest: () => null,
  deletePointOfInterest: () => null,
  createPointOfInterest: () => null,
};

const PointsOfInterestContext =
  createContext<PointsOfInterestContextProps>(defaultContext);

export const PointsOfInterestProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data } = useGetPointsOfInterest();
  const { savePointOfInterest: savePointOfInterestMutation } =
    useSavePointOfInterest();
  const { updatePointOfInterest: updatePointOfInterestMutation } =
    useUpdatePointOfInterest();
  const { deletePointOfInterest: deletePointOfInterestMutation } =
    useDeletePointOfInterest();
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(
    []
  );

  useEffect(() => {
    if (data) {
      setPointsOfInterest(data);
    }
  }, [data]);

  const updatePointOfInterest = (
    pointOfInterestUpdatedData: PointOfInterest
  ) => {
    const updatedPointsOfInterest = pointsOfInterest.filter(
      (pointOfInterest) => pointOfInterest.id !== pointOfInterestUpdatedData.id
    );
    updatedPointsOfInterest.push(pointOfInterestUpdatedData);

    setPointsOfInterest(updatedPointsOfInterest);
    updatePointOfInterestMutation(pointOfInterestUpdatedData);
  };

  const createPointOfInterest = (pointOfInterest: PointOfInterest) => {
    const updatedPointsOfInterest = pointsOfInterest.concat(pointOfInterest);
    setPointsOfInterest(updatedPointsOfInterest);
    savePointOfInterestMutation(pointOfInterest);
  };

  const deletePointOfInterest = (id: string) => {
    const updatedPointsOfInterest = pointsOfInterest.filter(
      (pointOfInterest) => pointOfInterest.id !== id
    );
    setPointsOfInterest(updatedPointsOfInterest);
    deletePointOfInterestMutation(id);
  };

  return (
    <PointsOfInterestContext.Provider
      value={{
        pointsOfInterest,
        updatePointOfInterest,
        deletePointOfInterest,
        createPointOfInterest,
      }}
    >
      {children}
    </PointsOfInterestContext.Provider>
  );
};

export const usePointsOfInterestContext = () => {
  return useContext(PointsOfInterestContext);
};

// Types
import { PointOfInterest } from '../../features/interactive-map/services/types/point-of-interest.types';

// Get points of interest from the local storage
export const fetchPointsOfInterest = async (): Promise<PointOfInterest[]> => {
  const pointsOfInterest = await getPointsOfInterestFromLocalStorage();
  return pointsOfInterest;
};

const getPointsOfInterestFromLocalStorage = () => {
  const pointsOfInterest: PointOfInterest[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && key.startsWith('poi-')) {
      const pointOfInterestData = localStorage.getItem(key);
      if (pointOfInterestData) {
        const pointOfInterest: PointOfInterest =
          JSON.parse(pointOfInterestData);
        pointsOfInterest.push(pointOfInterest);
      }
    }
  }
  return pointsOfInterest;
};

export const savePointOfInterest = async (data: PointOfInterest) => {
  await savePointOfInterestToLocalStorage(data);
};

const savePointOfInterestToLocalStorage = async (data: PointOfInterest) => {
  await localStorage.setItem(data.id, JSON.stringify(data));
};

export const updatePointOfInterest = async (data: PointOfInterest) => {
  await savePointOfInterestToLocalStorage(data);
};

export const deletePointOfInterest = async (id: string) => {
  const rawDeletedPointOfInterest = localStorage.getItem(id);
  if (rawDeletedPointOfInterest) {
    localStorage.removeItem(id);
    // const deletedPointOfInterest = JSON.parse(rawDeletedPointOfInterest);
    // const updatedPointOfInterest = {
    //   ...deletedPointOfInterest,
    //   deletedAt: new Date().toDateString(),
    // };
    // await updatePointOfInterest(updatedPointOfInterest);
  }
};

export type PointOfInterest = {
  id: string;
  title: string;
  description: string;
  coordinates: Array<number>;
  createdAt: string;
  createdBy: string;
  deletedAt?: string;
};

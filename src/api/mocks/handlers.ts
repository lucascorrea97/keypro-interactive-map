// Libraries
import { http, HttpResponse } from 'msw';

// Services
import {
  deletePointOfInterest,
  fetchPointsOfInterest,
  savePointOfInterest,
  updatePointOfInterest,
} from '../services/points-of-interest-service';
import {
  createUser,
  loginUser,
  logoutUser,
  reAuthenticateUser,
} from '../services/users-service';

// Types
import { PointOfInterest } from '../../features/interactive-map/services/types/point-of-interest.types';

type CreatePointOfInterestRequest = {
  payload: {
    data: PointOfInterest;
  };
};

type UpdatePointOfInterestRequest = {
  payload: {
    data: PointOfInterest;
  };
};

type CreateUserRequest = {
  payload: {
    email: string;
    password: string;
    confirmPassword: string;
  };
};

type LoginUserRequest = {
  payload: {
    email: string;
    password: string;
  };
};

type LogoutUserRequest = {
  payload: {
    email: string;
  };
};

export const handlers = [
  // Mock for fetching points of interest
  http.get('/api/points-of-interest', async () => {
    try {
      const data = await fetchPointsOfInterest();
      return HttpResponse.json(data, { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { message: 'Error fetching points of interest' },
        { status: 400 }
      );
    }
  }),

  // Mock for creating a point of interest
  http.post('api/point-of-interest', async ({ request }) => {
    const response =
      (await request.json()) as never as CreatePointOfInterestRequest;
    const data = response.payload.data;
    await savePointOfInterest(data);
    return HttpResponse.json(data, {
      status: 200,
    });
  }),

  // Mock for updating a point of interest
  http.patch('api/point-of-interest/:id', async ({ request }) => {
    const response =
      (await request.json()) as never as UpdatePointOfInterestRequest;
    const data = response.payload.data;
    await updatePointOfInterest(data);
    return HttpResponse.json(data, {
      status: 200,
    });
  }),

  // Mock for deleting a point of interest
  http.delete('api/point-of-interest/:id', async ({ params }) => {
    const { id } = params;
    await deletePointOfInterest(id.toString());
    return HttpResponse.json({}, { status: 200 });
  }),

  // Mock for creating a user
  http.post('api/user', async ({ request }) => {
    const response = (await request.json()) as never as CreateUserRequest;
    const payload = response.payload;
    const newUser = await createUser(payload);
    return HttpResponse.json(newUser, { status: 200 });
  }),

  // Mock for logging in the user
  http.post('api/user-login', async ({ request }) => {
    const response = (await request.json()) as never as LoginUserRequest;
    const payload = response.payload;
    if (payload) {
      const loggedInUser = await loginUser(payload);
      return HttpResponse.json(loggedInUser, { status: 200 });
    } else {
      // Trying to log in authenticated user
      const loggedInUser = await reAuthenticateUser();
      return HttpResponse.json(loggedInUser, { status: 200 });
    }
  }),
  // Mock for logging out the user
  http.post('api/user-logout', async ({ request }) => {
    const response = (await request.json()) as never as LogoutUserRequest;
    const payload = response.payload;
    await logoutUser(payload.email);
    return HttpResponse.json({}, { status: 200 });
  }),
];

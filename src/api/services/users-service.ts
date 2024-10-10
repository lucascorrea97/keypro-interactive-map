// Types
import {
  SignInData,
  SignUpData,
} from '../../features/authentication/services/types/authentication.types';
import { User } from '../../features/authentication/services/types/user.types';

const getUser = async (email: string) => {
  const rawExistingUser = await localStorage.getItem(email);
  if (rawExistingUser) {
    const existingUser: User = JSON.parse(rawExistingUser);
    return existingUser;
  }
};

export const createUser = async (signUpData: SignUpData) => {
  const isUserCreated = await getUser(signUpData.email);
  if (!isUserCreated) {
    const { email, password } = signUpData;
    const savedUser = { email, password };
    await saveUser(savedUser);
    return savedUser;
  }
};

export const reAuthenticateUser = async () => {
  const loggedUser = await getLoggedUser();
  if (loggedUser) {
    return await loginUser({
      email: loggedUser.email,
      password: loggedUser.password,
    });
  }
};

export const loginUser = async (signInData: SignInData) => {
  const existingUser = await getUser(signInData.email);
  if (existingUser) {
    const isCorrectPassword = existingUser.password === signInData.password;
    if (isCorrectPassword) {
      localStorage.setItem(
        'logged-user',
        JSON.stringify({
          ...existingUser,
        })
      );
      return existingUser;
    }
  }
};

const getLoggedUser = async () => {
  const rawUserData = await localStorage.getItem('logged-user');
  if (rawUserData) {
    const loggedUser: User = JSON.parse(rawUserData);
    return loggedUser;
  }
};

export const logoutUser = async (email: string) => {
  const loggedUser = await getLoggedUser();
  // Verifies the correct user wants to log out
  if (email === loggedUser?.email) {
    await localStorage.removeItem('logged-user');
  }
};

const saveUser = async (user: User) => {
  await localStorage.setItem(user.email, JSON.stringify(user));
};

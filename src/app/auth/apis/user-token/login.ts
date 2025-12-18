import { authApi } from '@/infrastructure/net';

import { User } from '../../models';
import { USER_TOKEN_ENDPOINTS } from './endpoints';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = User & {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export const userLogin = async ({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await authApi.post<LoginResponse>(
    USER_TOKEN_ENDPOINTS.login,
    { username, password },
  );

  return response.data;
};

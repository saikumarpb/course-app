import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACKEND_URL } from '../utils/constants';

interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export async function adminLogin(request: LoginRequest) {
  try {
    const response = await axios.post<
      LoginRequest,
      AxiosResponse<LoginResponse>
    >(`${BACKEND_URL}/admin/login`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) throw new Error(e.response?.data?.message);
  }
}

export async function userLogin(request: LoginRequest) {
  try {
    const response = await axios.post<
      LoginRequest,
      AxiosResponse<LoginResponse>
    >(`${BACKEND_URL}/user/login`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) throw new Error(e.response?.data?.message);
  }
}

import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACKEND_URL } from '../utils/constants';

interface SignupRequest {
  username: string;
  password: string;
}

interface SignupResponse {
  message: string;
  token: string;
}

export async function adminSignup(request: SignupRequest) {
  try {
    const response = await axios.post<
      SignupRequest,
      AxiosResponse<SignupResponse>
    >(`${BACKEND_URL}/admin/signup`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function userSignup(request: SignupRequest) {
  try {
    const response = await axios.post<
      SignupRequest,
      AxiosResponse<SignupResponse>
    >(`${BACKEND_URL}/user/signup`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) throw new Error(e.response?.data?.message);
  }
}

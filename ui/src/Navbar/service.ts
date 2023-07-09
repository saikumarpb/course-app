import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from '../utils/constants';

interface UserDetails {
  username: string;
  role: 'user' | 'admin';
}

export async function getUser(token: string) {
  try {
    const response = await axios.get<any, AxiosResponse<UserDetails>>(
      `${BACKEND_URL}/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    return response.data
  } catch (e) {
    throw e;
  }
}

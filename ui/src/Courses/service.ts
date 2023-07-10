import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { Course, CourseResponse } from './types';

export async function postCourse(course: Course, token: string) {
  await axios.post<Course>(`${BACKEND_URL}/admin/courses`, course, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchCourseList(role: 'admin' | 'user', token: string) {
  try {
    const response = await axios.get<CourseResponse>(
      `${BACKEND_URL}/${role}/courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.courses;
  } catch (e) {
    throw e;
  }
}

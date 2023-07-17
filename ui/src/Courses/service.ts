import axios, { AxiosError } from 'axios';
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

export async function updateCourse(
  courseId: string,
  course: Course,
  token: string
) {
  await axios.put<Course>(`${BACKEND_URL}/admin/courses/${courseId}`, course, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteCourse(courseId: string, token: string) {
  await axios.delete(`${BACKEND_URL}/admin/courses/${courseId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchCourseList() {
  try {
    const response = await axios.get<CourseResponse>(`${BACKEND_URL}/courses`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.courses;
  } catch (e) {
    throw e;
  }
}

export async function fetchAdminCourseList(token: string) {
  try {
    const response = await axios.get<CourseResponse>(
      `${BACKEND_URL}/admin/courses`,
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

export async function buyCourse(token: string, courseId: string) {
  try {
    console.log('From purchase course', courseId, token);

    const response = await axios.post<{ message: string }>(
      `${BACKEND_URL}/users/courses/${courseId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) throw new Error(e.response?.data?.message);
  }
}

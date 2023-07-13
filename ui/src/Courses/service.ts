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

export async function fetchAdminCourseList(role: 'admin', token: string) {
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

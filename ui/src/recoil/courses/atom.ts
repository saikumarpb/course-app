import { atom, selectorFamily } from 'recoil';
import { Course } from '../../Courses/types';

export const courseList = atom<(Course & { _id: string })[]>({
  key: 'courseList',
  default: [],
});

export const filteredCourse = selectorFamily({
  key: 'filteredCourse',
  get:
    (courseId: string) =>
    ({ get }) => {
      const list = get(courseList);
      return list.find((course) => course._id === courseId);
    },
});

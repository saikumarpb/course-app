import { atom, selector, selectorFamily } from 'recoil';
import { Course } from '../../Courses/types';
import { authState } from '../auth/atom';
import { fetchAdminCourseList, fetchCourseList } from '../../Courses/service';

const fetchCourses = selector({
  key: 'fetchCourses',
  get: async ({ get }) => {
    console.log('fetching courses');
    const auth = get(authState);
    let list: (Course & { _id: string })[] = [];
    try {
      if (auth.role === 'admin' && auth.token) {
        list = await fetchAdminCourseList(auth.token);
      } else {
        list = await fetchCourseList();
      }
    } catch (e) {
      console.log(e);
    }
    return list;
  },
});

export const filterdCourseList = selector({key: 'filteredCourseList', get: ({get}) => {
  const courses = get(courseList)
  const searchString = get(courseSearchString).toLowerCase()
  if(searchString){
    return courses.filter(course => course.title.toLowerCase().includes(searchString))
  }
  return courseList
}})

export const courseList = atom<(Course & { _id: string })[]>({
  key: 'courseList',
  default: fetchCourses,
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



export const courseSearchString = atom({key:'courseSearchString', default: ''})
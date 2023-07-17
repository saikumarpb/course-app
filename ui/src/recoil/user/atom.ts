import { atom, selector } from 'recoil';
import { authState } from '../auth/atom';
import { fetchPurchasedCourses } from '../../Courses/service';
import { Course } from '../../Courses/types';

const purchasedCoursesSelector = selector({
  key: 'purchasedCoursesSelector',
  get: async ({ get }) => {
    const auth = get(authState);
    let response = [] as (Course & { _id: string })[];
    if (auth.isLoggedin && auth.token && auth.role === 'user') {
      response = await fetchPurchasedCourses(auth.token);
    }
    return response;
  },
});

export const purchasedCourses = atom({
  key: 'purchasesCourses',
  default: purchasedCoursesSelector,
});

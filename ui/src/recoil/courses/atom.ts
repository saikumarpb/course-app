import { selector } from 'recoil';
import { authState } from '../auth/atom';
import { fetchAdminCourseList, fetchCourseList } from '../../Courses/service';

export const courseList = selector({
  key: 'courseSelector',
  get: async ({ get }) => {
    const auth = get(authState);
    if (auth.role === 'admin' && auth.token && auth.isLoggedin) {
      try {
        const response = await fetchAdminCourseList('admin', auth.token);
        return response;
      } catch {
        return [];
      }
    } else {
      try {
        const response = await fetchCourseList();
        return response;
      } catch {
        return [];
      }
    }
  },
});

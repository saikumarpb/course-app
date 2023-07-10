import { atom } from 'recoil';
import { Course } from '../../Courses/types';

export const courseList = atom<(Course & {_id: string})[]>({ key: 'courseList', default: [] });

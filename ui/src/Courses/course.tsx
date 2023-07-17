import { useParams } from 'react-router-dom';
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from 'recoil';
import { filteredCourse } from '../recoil/courses/atom';
import Loading from '../components/Loading';
import { ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';
import { authState } from '../recoil/auth/atom';
import { buyCourse } from './service';
import { toast } from 'react-toastify';
import { purchasedCourses } from '../recoil/user/atom';

export default function Course() {
  const { courseId } = useParams();
  const course = useRecoilValueLoadable(filteredCourse(courseId!));
  const auth = useRecoilValue(authState);
  const resetPurchases = useResetRecoilState(purchasedCourses);

  const purchaseCourse = async (courseId: string) => {
    if (auth.isLoggedin && auth.token && auth.role === 'user') {
      let toastId = toast.loading('purchasing course ....', {
        position: 'bottom-right',
      });

      try {
        const response = await buyCourse(auth.token, courseId);
        toast.update(toastId, {
          isLoading: false,
          autoClose: 1500,
          type: 'success',
          render: response?.message,
        });
        // TODO: Check if reset is working (try atom effects)
        resetPurchases();
      } catch (e) {
        if (e instanceof Error)
          toast.update(toastId, {
            isLoading: false,
            autoClose: 1500,
            type: 'error',
            render: e.message,
          });
      }
    } else {
      toast.error('Login as a user to purchase course', {
        position: 'bottom-right',
      });
    }
  };

  switch (course.state) {
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <div>Something went wrong please try again</div>;
    case 'hasValue':
      return (
        <div className="w-full flex flex-col p-4 items-center">
          <div className=" w-full bg-slate-300 flex justify-between rounded gap-4">
            <div className="flex flex-col gap-4 pl-4 justify-center py-4">
              <div className="text-2xl text-sky-600 font-bold">
                {course.contents?.title}
              </div>
              <div className="text-xl text-green-900">
                Rs. {course.contents?.price}
              </div>
              <div className="text-xl">{course.contents?.description}</div>
              <Button
                className="w-fit"
                variant="contained"
                onClick={() => purchaseCourse(course.contents!._id)}
              >
                <span>Enroll</span>
                <ShoppingCart />
              </Button>
            </div>
            <img src={course.contents?.imageLink} className="w-1/2 rounded-r" />
          </div>
        </div>
      );
  }
}

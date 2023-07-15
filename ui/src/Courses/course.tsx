import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { filteredCourse } from '../recoil/courses/atom';
import Loading from '../components/Loading';

export default function Course() {
  const { courseId } = useParams();
  const course = useRecoilValueLoadable(filteredCourse(courseId!));
  switch (course.state) {
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <div>Something went wrong please try again</div>;
    case 'hasValue':
      return (
        <div className="w-full flex flex-col p-4 items-center">
          <div className=" w-full bg-slate-300 flex justify-between rounded gap-4">
            <div className="flex flex-col gap-4 pl-4 justify-center">
              <div className="text-2xl text-sky-600 font-bold">
                {course.contents?.title}
              </div>
              <div className="text-xl text-green-900">Rs. {course.contents?.price}</div>
              <div className="text-xl">{course.contents?.description}</div>
            </div>
            <img src={course.contents?.imageLink} className="w-1/2 rounded-r" />
          </div>
        </div>
      );
  }
}

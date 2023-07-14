import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { filteredCourse } from '../recoil/courses/atom';

export default function Course() {
  const { courseId } = useParams();
  const course = useRecoilValue(filteredCourse(courseId!));
  return (
    <div className="w-full flex flex-col p-4 items-center gap-4">
      <div className=" w-full bg-slate-300 flex justify-between rounded">
        <div className="flex flex-col gap-4 pl-4 justify-center">
          <div className="text-2xl text-sky-600 font-bold">{course?.title}</div>
          <div className="text-xl">Rs. {course?.price}</div>
          <div className="text-xl">{course?.description}</div>
        </div>
        <img src={course?.imageLink} className="w-1/2 rounded-r" />
      </div>
    </div>
  );
}

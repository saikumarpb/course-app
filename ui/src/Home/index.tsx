import { useRecoilValue } from 'recoil';
import { courseList } from '../recoil/courses/atom';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  let courses = useRecoilValue(courseList);
  courses = courses.filter((course) => course.published).slice(0, 3);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-4 p-4 items-center">
      <div className="text-2xl font-bold">Featured</div>
      <div className="flex flex-wrap gap-4 justify-center">
        {courses.map((course) => {
          return (
            <CourseCard
              key={course._id}
              title={course.title}
              description={course.description}
              imageLink={course.imageLink}
              published={course.published}
              price={course.price}
              onClick={() => {
                navigate(`${course._id}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;

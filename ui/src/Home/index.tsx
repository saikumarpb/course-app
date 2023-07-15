import {
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from 'recoil';
import { courseList, courseSearchString } from '../recoil/courses/atom';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useEffect } from 'react';

function Home() {
  const getCourses = useRecoilValueLoadable(courseList);

  const resetSearchString = useResetRecoilState(courseSearchString);
  const searchString = useRecoilValue(courseSearchString);
  useEffect(() => {
    resetSearchString();
  }, []);
  const navigate = useNavigate();

  switch (getCourses.state) {
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <>Something went wrong, Please try again</>;
    case 'hasValue':
      return (
        <div className="w-full flex flex-col gap-4 p-4 items-center justify-center">
          {getCourses.contents.length === 0 && searchString ? (
            <div className="w-full bg-red-100 rounded font-semibold text-xl text-center text-red-900">
              Course not found
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">Featured</div>
              <div className="flex flex-wrap gap-4 justify-center rounded">
                {getCourses.contents.map((course) => {
                  return (
                    <CourseCard
                      key={course._id}
                      title={course.title}
                      description={course.description}
                      imageLink={course.imageLink}
                      published={course.published}
                      price={course.price}
                      onClick={() => {
                        navigate(`courses/${course._id}`);
                      }}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      );
  }
}

export default Home;

import { useRecoilValueLoadable } from 'recoil';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { purchasedCourses } from '../recoil/user/atom';

export default function PurchasedCourses() {
  const purchases = useRecoilValueLoadable(purchasedCourses);

  const navigate = useNavigate();

  switch (purchases.state) {
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <>Something went wrong, Please try again</>;
    case 'hasValue':
      return (
        <div className="w-full flex flex-col gap-4 p-4 items-center justify-center">
          {purchases.contents.length === 0 ? (
            <div className="w-full rounded font-semibold text-xl text-center bg-yellow-50 p-3">
              No Purchases Found
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">Purchased courses</div>
              <div className="flex flex-wrap gap-4 justify-center rounded">
                {purchases.contents.map((course) => {
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

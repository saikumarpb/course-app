import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteCourse, postCourse, updateCourse } from './service';
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from 'recoil';
import { authState } from '../recoil/auth/atom';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { Course } from './types';
import { courseList, courseSearchString, filterdCourseList } from '../recoil/courses/atom';
import CourseCard from '../components/CourseCard';
import { AddCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const defaultCourse: Course = {
  title: '',
  description: '',
  imageLink: '',
  published: false,
  price: '',
};

function Courses() {
  const [formData, setFormData] = useState(defaultCourse);
  const [showModal, setShowModal] = useState(false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const courses = useRecoilValueLoadable(filterdCourseList);
  const resetCourseList = useResetRecoilState(courseList);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const searchString = useRecoilValue(courseSearchString);
  const resetSearchString = useResetRecoilState(courseSearchString);

  useEffect(() => {
    resetSearchString();
  }, []);
  // const open = Boolean(anchorEl);

  // const handleSelectFilter = (e: React.MouseEvent<unknown, unknown>) => {
  //   console.log(e.target);
  //   handleCloseFilterMenu();
  // };
  // const handleCloseFilterMenu = () => {
  //   setAnchorEl(null);
  // };

  const handleFormChange = (key: keyof Course, value: string | boolean) => {
    setFormData((current) => {
      return { ...current, [key]: value };
    });
  };

  const closeModal = () => setShowModal(false);

  const handleDelete = async (courseId: string) => {
    try {
      if (auth.token) {
        await toast.promise(
          deleteCourse(courseId, auth.token),
          {
            pending: 'Deleting course ...',
            success: 'Course deleted successfully',
            error: 'Failed to delete course',
          },
          {
            autoClose: 2000,
            position: 'bottom-right',
          }
        );
        resetCourseList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<unknown, unknown>) => {
    e.preventDefault();
    try {
      if (selectedCourseId && auth.token) {
        await toast.promise(
          updateCourse(selectedCourseId, formData, auth.token),
          {
            pending: 'Updating the course',
            success: 'Course updated successfully',
            error: 'Failed to update course',
          },
          { position: 'bottom-right', autoClose: 2000 }
        );

        setSelectedCourseId('');
      } else {
        await toast.promise(
          postCourse(formData, auth.token!),
          {
            pending: 'Adding the course',
            success: 'Course added successfully',
            error: 'Failed to add course',
          },
          { position: 'bottom-right', autoClose: 2000 }
        );
      }
      setFormData(() => defaultCourse);
      closeModal();
      resetCourseList();
    } catch (e) {
      console.log('Failed to add course');
    }
  };

  const addCourseModalBody = () => {
    return (
      <form className="pt-4 flex flex-col gap-4">
        <TextField
          value={formData.title}
          onChange={(e) => handleFormChange('title', e.target.value)}
          label="Title"
          required
          type="text"
        />
        <div className="flex justify-between">
          <TextField
            label="Price"
            value={formData.price}
            onChange={(e) => handleFormChange('price', e.target.value)}
            type="text"
            required
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.published}
                  onChange={(e) =>
                    handleFormChange('published', e.target.checked)
                  }
                />
              }
              label="Publish"
            />
          </FormGroup>
        </div>

        <TextField
          label="Description"
          value={formData.description}
          onChange={(e) => handleFormChange('description', e.target.value)}
          type="text"
          required
        />

        <TextField
          label="Image Link"
          value={formData.imageLink}
          onChange={(e) => handleFormChange('imageLink', e.target.value)}
          type="text"
          required
        />
        <Button
          variant="contained"
          style={{ textTransform: 'none' }}
          onClick={handleSubmit}
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  };

  const RenderCourses = () => {
    switch (courses.state) {
      case 'loading':
        return <Loading />;
      case 'hasError':
        return <div>Something went wrong please try again</div>;
      case 'hasValue':
        return (
          <div className="flex flex-col">
            {auth.role === 'admin' && (
              <div className="flex flex-row-reverse gap-2 py-3">
                {/* <Button
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                  style={{ textTransform: 'none' }}
                  className="w-fit"
                  variant="contained"
                >
                  <div className="flex justify-center">
                    Filter
                    <FilterList className="ml-3" />
                  </div>
                  <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseFilterMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleSelectFilter}>Published</MenuItem>
                  <MenuItem onClick={handleSelectFilter}>Unpublished</MenuItem>
                  <MenuItem onClick={handleSelectFilter}>All courses</MenuItem>
                </Menu>
                </Button> */}

                <Button
                  onClick={() => setShowModal(true)}
                  style={{ textTransform: 'none' }}
                  className="w-fit"
                  variant="contained"
                >
                  <div className="flex justify-center">
                    Add Course
                    <AddCircle className="ml-3" />
                  </div>
                </Button>
              </div>
            )}
            {courses.contents.length === 0 && searchString ? (
              <div className="m-6 bg-red-100 rounded font-semibold text-xl text-center text-red-900 p-3">
                Course not found
              </div>
            ) : (
              <>
                <div className="w-full p-3 flex justify-center font-bold text-2xl">
                  Courses
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {courses.contents.map((course) => {
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
                        onEdit={
                          auth.role === 'admin'
                            ? () => {
                                setSelectedCourseId(course._id);
                                setFormData(() => {
                                  return {
                                    title: course.title,
                                    description: course.description,
                                    imageLink: course.imageLink,
                                    price: course.price,
                                    published: course.published,
                                  };
                                });
                                setShowModal(true);
                              }
                            : undefined
                        }
                        onDelete={
                          auth.role === 'admin'
                            ? () => handleDelete(course._id)
                            : undefined
                        }
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <>
      <RenderCourses />
      <Modal
        title={!selectedCourseId ? 'Add course' : 'Edit course'}
        body={addCourseModalBody()}
        showModal={showModal}
        closeModal={closeModal}
      />
    </>
  );
}

export default Courses;

import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCourseList, postCourse, updateCourse } from './service';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../recoil/auth/atom';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { Course } from './types';
import { courseList } from '../recoil/courses/atom';
import CourseCard from '../components/CourseCard';
import { AddCircle, FilterList } from '@mui/icons-material';

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
  const [courses, setCourses] = useRecoilState(courseList);
  const [editCourseId, setEditCourseId] = useState('');

  const auth = useRecoilValue(authState);

  const getCourses = async () => {
    try {
      if (auth.role && auth.token) {
        const response = await fetchCourseList(auth.role!, auth.token!);
        setCourses(() => response);
      }
    } catch (e) {
      toast.error('Fetching course failed', {
        position: 'bottom-right',
      });
    }
  };

  useEffect(() => {
    if (auth.isLoggedin) {
      getCourses();
    }
  }, [auth]);

  const handleFormChange = (key: keyof Course, value: string | boolean) => {
    setFormData((current) => {
      return { ...current, [key]: value };
    });
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e: React.MouseEvent<unknown, unknown>) => {
    e.preventDefault();
    try {
      if (editCourseId && auth.token) {
        await toast.promise(
          updateCourse(editCourseId, formData, auth.token),
          {
            pending: 'Updating the course',
            success: 'Course updated successfully',
            error: 'Failed to update course',
          },
          { position: 'bottom-right', autoClose: 3000 }
        );

        setEditCourseId('');
      } else {
        await toast.promise(
          postCourse(formData, auth.token!),
          {
            pending: 'Adding the course',
            success: 'Course added successfully',
            error: 'Failed to add course',
          },
          { position: 'bottom-right', autoClose: 3000 }
        );
      }
      setFormData(() => defaultCourse);
      closeModal();
      getCourses();
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
  return (
    <div className="flex flex-col">
      {auth.role === 'admin' && (
        <div className="flex flex-row-reverse gap-2 py-3">
          <Button
            onClick={() => {}}
            style={{ textTransform: 'none' }}
            className="w-fit"
            variant="contained"
          >
            <div className="flex justify-center">
              Filter
              <FilterList className="ml-3" />
            </div>
          </Button>
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

      <Modal
        title={!editCourseId ? 'Add course' : 'Edit course'}
        body={addCourseModalBody()}
        showModal={showModal}
        closeModal={closeModal}
      />

      <Grid container spacing={2} justifyContent="center">
        {courses.map((course) => {
          return (
            <Grid item key={course._id} className="h-100">
              <CourseCard
                // key={course._id}
                title={course.title}
                description={course.description}
                imageLink={course.imageLink}
                published={course.published}
                price={course.price}
                onClick={() => {}}
                onEdit={
                  auth.role === 'admin'
                    ? () => {
                        setEditCourseId(course._id);
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
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Courses;

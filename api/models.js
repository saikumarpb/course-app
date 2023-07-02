import { Schema, SchemaTypes, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  courses: {
    type: [{ type: SchemaTypes.ObjectId, ref: 'Course' }],
    validate: {
      validator: validatePurchasedCourses,
      message: 'Course already purchased',
    },
  },
});

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  published: { type: Boolean, required: true },
  imageLink: { type: String, required: true },
});

async function validatePurchasedCourses(courses) {
  const uniqueCourseIds = new Set();

  for (const course of courses) {
    const courseId = course._id.toString();
    console.log(courseId);
    if (uniqueCourseIds.has(courseId)) {
      return false;
    }
    uniqueCourseIds.add(courseId);
  }
  return true;
}

export const User = model('User', userSchema);
export const Admin = model('Admin', adminSchema);
export const Course = model('Course', courseSchema);

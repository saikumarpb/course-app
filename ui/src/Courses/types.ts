export interface Course {
  title: string;
  description: string;
  imageLink: string;
  published: boolean;
  price: string;
}

export interface CourseResponse {
  courses: (Course & { _id: string })[];
}

export interface PurchasedCourseResponse {
  purchasedCourses: (Course & { _id: string })[];
}

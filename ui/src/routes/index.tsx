import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Courses from '../Courses';
import Home from '../Home';
import Course from '../Courses/course';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:courseId',
        element: <Course />,
      },
    ],
  },
  {
    path: '/:admin',
    element: <App />,
    children: [
      {
        path: '/:admin/',
        element: <Home />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:courseId',
        element: <Course />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

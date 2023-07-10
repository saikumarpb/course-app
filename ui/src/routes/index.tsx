import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Courses from '../Courses';
import Home from '../Home';

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
    ],
  },
];

export const router = createBrowserRouter(routes);

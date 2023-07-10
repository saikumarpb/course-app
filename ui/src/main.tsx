import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
      <ToastContainer />
    </RecoilRoot>
  </React.StrictMode>
);

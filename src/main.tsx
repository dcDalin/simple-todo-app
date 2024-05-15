import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import ErrorPage from './pages/error-page';
import MainLayout from './layouts/main-layout';
import LoginPage from './pages/login-page';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ListPage from './pages/list-page';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

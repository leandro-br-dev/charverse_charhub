import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from '@/constants';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';

// Layout Components (to be created later)
// import RootLayout from '@/components/layout/RootLayout';
// import AuthLayout from '@/components/layout/AuthLayout';
// import ProtectedRoute from '@/components/auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />,
  },
  // More routes will be added as we develop the features
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
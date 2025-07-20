import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/dashboard/Profile';
import Home from '../pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
                    },
                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
]);

export default router;
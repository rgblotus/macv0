import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-primary-600">
                            MyApp
                        </Link>
                        <nav className="ml-10 hidden md:flex space-x-8">
                            <Link
                                to="/"
                                className={`${location.pathname === '/' ? 'text-primary-600' : 'text-gray-500'} hover:text-primary-500`}
                            >
                                Home
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to="/dashboard"
                                    className={`${location.pathname === '/dashboard' ? 'text-primary-600' : 'text-gray-500'} hover:text-primary-500`}
                                >
                                    Dashboard
                                </Link>
                            )}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-gray-600 hidden sm:inline">
                                    Hi, {user?.first_name || user?.email}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { register } from '../../api/auth';
import Card from '../../components/ui/Card';
import RegisterForm from '../../components/auth/RegisterForm';

export default function Register() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (formData: {
        email: string;
        password: string;
        password2: string;
        first_name: string;
        last_name: string;
    }) => {
        setIsLoading(true);
        setError('');

        try {
            const data = await register(formData);
            authLogin(data);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <Card>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-600 mt-2">
                        Get started with our application
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
                        {error}
                    </div>
                )}

                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="text-primary-600 font-medium hover:text-primary-500"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}
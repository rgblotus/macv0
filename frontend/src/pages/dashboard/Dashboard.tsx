import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

export default function Dashboard() {
    const { user } = useAuth();

    const { data, isLoading, error } = useQuery({
        queryKey: ['protected-data'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8000/api/auth/protected/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch protected data');
            return response.json();
        }
    });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Welcome back, {user?.first_name || user?.email}!
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Account</h2>
                    <div className="space-y-2">
                        <div className="flex">
                            <span className="text-gray-600 w-24">Email:</span>
                            <span className="font-medium">{user?.email}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-24">Name:</span>
                            <span className="font-medium">
                                {user?.first_name} {user?.last_name}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Protected Data</h2>
                    {isLoading && <Loader />}
                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md">
                            Error: {error.message}
                        </div>
                    )}
                    {data && (
                        <div className="bg-green-50 p-4 rounded-md">
                            <p className="text-green-700">{data.message}</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
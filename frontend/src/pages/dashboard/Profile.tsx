import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Profile() {
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout(); // Now matches the context signature
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                <p className="text-gray-600 mt-2">
                    Manage your account settings
                </p>
            </div>

            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center" />
                    </div>

                    <div className="flex-1">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="text-gray-900 font-medium">
                                    {user?.email}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <div className="text-gray-900 font-medium">
                                        {user?.first_name || 'Not set'}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <div className="text-gray-900 font-medium">
                                        {user?.last_name || 'Not set'}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    variant="primary"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
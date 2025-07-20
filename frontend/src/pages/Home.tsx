import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import WebGLBackground from '../components/index/WebGLBackground';

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <div>
                <WebGLBackground
                    particleCount={2000}
                    shaderName="particles"
                    className="fixed inset-0 -z-10" // Added -z-10
                />
            </div>
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Modern Authentication Solution
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Secure, scalable authentication with Django backend and React frontend
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-card p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">For Developers</h2>
                    <p className="text-gray-600 mb-6">
                        Build secure applications with JWT authentication, token refresh,
                        and protected routes using the latest technologies.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="bg-green-100 text-green-800 rounded-full p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>JWT Authentication</span>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-green-100 text-green-800 rounded-full p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>Token Rotation</span>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-green-100 text-green-800 rounded-full p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>Protected Routes</span>
                        </div>
                    </div>
                </div>

                <div className="bg-primary-50 rounded-xl shadow-card p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
                    <p className="text-gray-600 mb-6">
                        Join thousands of developers building secure applications with our
                        authentication solution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/register" className="flex-1">
                            <Button variant="primary" className="w-full">
                                Create Account
                            </Button>
                        </Link>
                        <Link to="/login" className="flex-1">
                            <Button variant="outline" className="w-full">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
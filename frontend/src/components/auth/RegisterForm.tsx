import { useState } from 'react';
import Button from '../ui/Button';

export default function RegisterForm({ onSubmit, isLoading }: {
    onSubmit: (data: {
        email: string;
        password: string;
        password2: string;
        first_name: string;
        last_name: string;
    }) => void;
    isLoading: boolean;
}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when field changes
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.password2) {
            newErrors.password2 = 'Passwords do not match';
        }
        if (!formData.first_name) newErrors.first_name = 'First name is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                </label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="input-field"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
            </div>

            <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                </label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="input-field"
                    value={formData.last_name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <input
                    id="password2"
                    name="password2"
                    type="password"
                    className="input-field"
                    value={formData.password2}
                    onChange={handleChange}
                />
                {errors.password2 && <p className="text-red-500 text-sm mt-1">{errors.password2}</p>}
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
            </div>
        </form>
    );
}
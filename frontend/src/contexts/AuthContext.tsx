import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getProfile, logout as apiLogout } from '../api/auth'; // Renamed import
import type { User } from '../api/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: { user: User; access: string; refresh: string }) => void;
    logout: () => Promise<void>; // Corrected type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const accessToken = localStorage.getItem('access_token');

            if (storedUser && accessToken) {
                try {
                    const profile = await getProfile();
                    setUser(profile);
                    localStorage.setItem('user', JSON.stringify(profile));
                } catch (error) {
                    console.error('Session validation failed', error);
                    await logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = ({ user, access, refresh }: { user: User; access: string; refresh: string }) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    // Fixed logout function
    const logout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            try {
                await apiLogout(refreshToken); // Use renamed function
            } catch (error) {
                console.error('Logout failed', error);
            }
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
import apiClient from './client';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface AuthResponse {
    user: User;
    access: string;
    refresh: string;
}

export const getCsrfToken = async (): Promise<string> => {
    const response = await apiClient.get<{ csrfToken: string }>('auth/csrf/');
    localStorage.setItem('csrf_token', response.data.csrfToken);
    return response.data.csrfToken;
};

export const register = async (data: {
    email: string;
    password: string;
    password2: string;
    first_name?: string;
    last_name?: string;
}): Promise<AuthResponse> => {
    await getCsrfToken(); // Fetch CSRF token before registration
    const response = await apiClient.post<AuthResponse>('auth/register/', data);
    return response.data;
};

// Repeat for login and logout functions
export const login = async (data: {
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    await getCsrfToken();
    const response = await apiClient.post<AuthResponse>('auth/login/', data);
    return response.data;
};

export const logout = async (refresh: string): Promise<void> => {
    await apiClient.post('auth/logout/', { refresh });
};

export const getProfile = async (): Promise<User> => {
    const response = await apiClient.get<User>('auth/profile/');
    return response.data;
};

// Add this to your existing auth.ts
export const getProtectedData = async (): Promise<{
    message: string;
    user: User;
}> => {
    const response = await apiClient.get('auth/protected/');
    return response.data;
};
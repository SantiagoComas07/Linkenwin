import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'CODER' | 'COMPANY'; // Matching backend roles broadly
}

export const login = async (data: LoginDto) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const register = async (data: RegisterDto) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};


import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const Modality = {
    REMOTE: 'remote',
    HYBRID: 'hybrid',
    ONSITE: 'presencial',
} as const;

export type Modality = typeof Modality[keyof typeof Modality];

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'CODER' | 'GESTOR' | 'COMPANY';
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'CODER' | 'COMPANY';
}

export interface CreateVacancyDto {
    title: string;
    description: string;
    technologies: string;
    seniority: string;
    softSkills?: string;
    location: string;
    modality: Modality;
    salaryRange: string;
    company: string;
    maxApplicants: number;
}

export interface Vacancy {
    id: string;
    title: string;
    description: string;
    technologies: string;
    seniority: string;
    location: string;
    modality: Modality;
    salaryRange: string;
    company: string;
    isActive: boolean;
    createdAt: string;
}

export interface Application {
    id: string;
    vacancyId: string;
    userId: string;
    appliedAt: string;
    vacancy?: Vacancy;
}

export const login = async (data: LoginDto) => {
    const response = await api.post('/auth/login', data);
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        // Assuming backend returns user object, if not we might need to fetch it or decode token
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
    }
    return response.data;
};

export const register = async (data: RegisterDto) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

// Vacancies
export const getVacancies = async () => {
    const response = await api.get<Vacancy[]>('/vacancies');
    return response.data;
};

export const getVacancyById = async (id: string) => {
    const response = await api.get<Vacancy>(`/vacancies/${id}`);
    return response.data;
};

export const createVacancy = async (data: CreateVacancyDto) => {
    const response = await api.post('/vacancies', data);
    return response.data;
};

export const updateVacancyStatus = async (id: string, isActive: boolean) => {
    const response = await api.patch(`/vacancies/${id}/status`, { isActive });
    return response.data;
};

// Applications
export const applyToVacancy = async (vacancyId: string) => {
    const response = await api.post('/applications', { vacancyId });
    return response.data;
};

export const getMyApplications = async () => {
    const response = await api.get<Application[]>('/applications/my-applications');
    return response.data;
};

export const getAllApplications = async () => {
    const response = await api.get<Application[]>('/applications');
    return response.data;
};

export default api;

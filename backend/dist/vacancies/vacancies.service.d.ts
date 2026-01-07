import { Repository } from 'typeorm';
import { Vacancy, Modality } from './entities/vacancy.entity';
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
export declare class VacanciesService {
    private vacanciesRepository;
    constructor(vacanciesRepository: Repository<Vacancy>);
    create(createVacancyDto: CreateVacancyDto): Promise<Vacancy>;
    findAll(): Promise<Vacancy[]>;
    findAllAdmin(): Promise<Vacancy[]>;
    findOne(id: string): Promise<Vacancy>;
    updateStatus(id: string, isActive: boolean): Promise<Vacancy>;
    updateMaxApplicants(id: string, maxApplicants: number): Promise<Vacancy>;
}

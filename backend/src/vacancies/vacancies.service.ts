import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class VacanciesService {
    constructor(
        @InjectRepository(Vacancy)
        private vacanciesRepository: Repository<Vacancy>,
    ) { }

    async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
        const vacancy = this.vacanciesRepository.create(createVacancyDto);
        return this.vacanciesRepository.save(vacancy);
    }

    async findAll(): Promise<Vacancy[]> {
        return this.vacanciesRepository.find({ where: { isActive: true } });
    }

    async findAllAdmin(): Promise<Vacancy[]> {
        return this.vacanciesRepository.find();
    }

    async findOne(id: string): Promise<Vacancy> {
        const vacancy = await this.vacanciesRepository.findOneBy({ id });
        if (!vacancy) {
            throw new NotFoundException(`Vacancy with ID ${id} not found`);
        }
        return vacancy;
    }

    async updateStatus(id: string, isActive: boolean): Promise<Vacancy> {
        const vacancy = await this.findOne(id);
        vacancy.isActive = isActive;
        return this.vacanciesRepository.save(vacancy);
    }
    async updateMaxApplicants(id: string, maxApplicants: number): Promise<Vacancy> {
        const vacancy = await this.findOne(id);
        vacancy.maxApplicants = maxApplicants;
        return this.vacanciesRepository.save(vacancy);
    }
}

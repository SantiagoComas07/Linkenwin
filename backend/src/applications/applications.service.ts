import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { VacanciesService } from '../vacancies/vacancies.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectRepository(Application)
        private applicationsRepository: Repository<Application>,
        private vacanciesService: VacanciesService,
        private usersService: UsersService,
    ) { }

    async apply(userId: string, vacancyId: string) {
        // 1. Check if vacancy exists and is active
        const vacancy = await this.vacanciesService.findOne(vacancyId);
        if (!vacancy.isActive) {
            throw new BadRequestException('Vacancy is not active');
        }

        // 2. Check if user already applied
        const existingApplication = await this.applicationsRepository.findOne({
            where: { userId, vacancyId },
        });
        if (existingApplication) {
            throw new BadRequestException('You have already applied to this vacancy');
        }

        // 3. Check max applicants
        const currentApplicants = await this.applicationsRepository.count({
            where: { vacancyId },
        });
        if (currentApplicants >= vacancy.maxApplicants) {
            throw new BadRequestException('Vacancy is full');
        }

        // 4. Check user max applications (to active vacancies)
        // Find all applications of user, then check which vacancies are active.
        // Optimization: Join applications with vacancies.
        const userApplications = await this.applicationsRepository.find({
            where: { userId },
            relations: ['vacancy'],
        });

        const activeApplicationsCount = userApplications.filter(app => app.vacancy.isActive).length;

        if (activeApplicationsCount >= 3) {
            throw new BadRequestException('You cannot apply to more than 3 active vacancies');
        }

        // Create Application
        const application = this.applicationsRepository.create({
            userId,
            vacancyId,
        });
        return this.applicationsRepository.save(application);
    }

    async findAll() {
        return this.applicationsRepository.find({
            relations: ['user', 'vacancy'],
        });
    }

    async findByUser(userId: string) {
        return this.applicationsRepository.find({
            where: { userId },
            relations: ['vacancy'],
        });
    }
}


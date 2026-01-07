import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { VacanciesService } from '../vacancies/vacancies.service';
import { UsersService } from '../users/users.service';
export declare class ApplicationsService {
    private applicationsRepository;
    private vacanciesService;
    private usersService;
    constructor(applicationsRepository: Repository<Application>, vacanciesService: VacanciesService, usersService: UsersService);
    apply(userId: string, vacancyId: string): Promise<Application>;
    findAll(): Promise<Application[]>;
    findByUser(userId: string): Promise<Application[]>;
}

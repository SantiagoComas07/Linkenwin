import { VacanciesService } from './vacancies.service';
import type { CreateVacancyDto } from './vacancies.service';
export declare class VacanciesController {
    private readonly vacanciesService;
    constructor(vacanciesService: VacanciesService);
    create(createVacancyDto: CreateVacancyDto): Promise<import("./entities/vacancy.entity").Vacancy>;
    findAll(req: any): Promise<import("./entities/vacancy.entity").Vacancy[]>;
    findOne(id: string): Promise<import("./entities/vacancy.entity").Vacancy>;
    updateStatus(id: string, isActive: boolean): Promise<import("./entities/vacancy.entity").Vacancy>;
}

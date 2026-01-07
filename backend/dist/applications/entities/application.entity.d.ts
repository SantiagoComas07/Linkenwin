import { User } from '../../users/entities/user.entity';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';
export declare class Application {
    id: string;
    user: User;
    userId: string;
    vacancy: Vacancy;
    vacancyId: string;
    appliedAt: Date;
}

import { ApplicationsService } from './applications.service';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    apply(req: any, vacancyId: string): Promise<import("./entities/application.entity").Application>;
    findAll(): Promise<import("./entities/application.entity").Application[]>;
    findMyApplications(req: any): Promise<import("./entities/application.entity").Application[]>;
}

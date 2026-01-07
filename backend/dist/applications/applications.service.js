"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("./entities/application.entity");
const vacancies_service_1 = require("../vacancies/vacancies.service");
const users_service_1 = require("../users/users.service");
let ApplicationsService = class ApplicationsService {
    applicationsRepository;
    vacanciesService;
    usersService;
    constructor(applicationsRepository, vacanciesService, usersService) {
        this.applicationsRepository = applicationsRepository;
        this.vacanciesService = vacanciesService;
        this.usersService = usersService;
    }
    async apply(userId, vacancyId) {
        const vacancy = await this.vacanciesService.findOne(vacancyId);
        if (!vacancy.isActive) {
            throw new common_1.BadRequestException('Vacancy is not active');
        }
        const existingApplication = await this.applicationsRepository.findOne({
            where: { userId, vacancyId },
        });
        if (existingApplication) {
            throw new common_1.BadRequestException('You have already applied to this vacancy');
        }
        const currentApplicants = await this.applicationsRepository.count({
            where: { vacancyId },
        });
        if (currentApplicants >= vacancy.maxApplicants) {
            throw new common_1.BadRequestException('Vacancy is full');
        }
        const userApplications = await this.applicationsRepository.find({
            where: { userId },
            relations: ['vacancy'],
        });
        const activeApplicationsCount = userApplications.filter(app => app.vacancy.isActive).length;
        if (activeApplicationsCount >= 3) {
            throw new common_1.BadRequestException('You cannot apply to more than 3 active vacancies');
        }
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
    async findByUser(userId) {
        return this.applicationsRepository.find({
            where: { userId },
            relations: ['vacancy'],
        });
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        vacancies_service_1.VacanciesService,
        users_service_1.UsersService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map
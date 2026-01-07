"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const user_entity_1 = require("./users/entities/user.entity");
const vacancies_service_1 = require("./vacancies/vacancies.service");
const vacancy_entity_1 = require("./vacancies/entities/vacancy.entity");
const bcrypt = __importStar(require("bcrypt"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const adminEmail = 'admin@linkenwin.com';
    const gestorEmail = 'gestor@linkenwin.com';
    const admin = await usersService.findOneByEmail(adminEmail);
    if (!admin) {
        const password = await bcrypt.hash('admin123', 10);
        await usersService.create({
            name: 'System Admin',
            email: adminEmail,
            password: password,
            role: user_entity_1.UserRole.ADMIN,
        });
        console.log('Admin user created');
    }
    else {
        console.log('Admin user already exists');
    }
    const gestor = await usersService.findOneByEmail(gestorEmail);
    if (!gestor) {
        const password = await bcrypt.hash('gestor123', 10);
        await usersService.create({
            name: 'Employability Manager',
            email: gestorEmail,
            password: password,
            role: user_entity_1.UserRole.GESTOR,
        });
        console.log('Gestor user created');
    }
    else {
        console.log('Gestor user already exists');
    }
    const vacanciesService = app.get(vacancies_service_1.VacanciesService);
    const vacancies = await vacanciesService.findAllAdmin();
    if (vacancies.length === 0) {
        await vacanciesService.create({
            title: 'Frontend Developer',
            description: 'React developer needed.',
            technologies: 'React, TypeScript, CSS',
            seniority: 'Mid',
            location: 'Remote',
            modality: vacancy_entity_1.Modality.REMOTE,
            salaryRange: '$3000 - $4000',
            company: 'Tech Corp',
            maxApplicants: 5,
        });
        await vacanciesService.create({
            title: 'Backend Developer',
            description: 'NestJS developer needed.',
            technologies: 'NestJS, PostgreSQL, Docker',
            seniority: 'Senior',
            location: 'New York',
            modality: vacancy_entity_1.Modality.ONSITE,
            salaryRange: '$5000 - $7000',
            company: 'Innovation Labs',
            maxApplicants: 10,
        });
        console.log('Sample vacancies created');
    }
    else {
        console.log('Vacancies already exist');
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map
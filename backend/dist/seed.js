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
    const admin = await usersService.findOneByEmail(adminEmail);
    if (!admin) {
        const password = await bcrypt.hash('admin123', 10);
        await usersService.create({
            name: 'System Admin',
            email: adminEmail,
            password: password,
            role: user_entity_1.UserRole.ADMIN,
        });
        console.log('✅ Admin user created - Email: admin@linkenwin.com | Password: admin123');
    }
    else {
        console.log('ℹ️  Admin user already exists');
    }
    const gestorEmail = 'gestor@linkenwin.com';
    const gestor = await usersService.findOneByEmail(gestorEmail);
    if (!gestor) {
        const password = await bcrypt.hash('gestor123', 10);
        await usersService.create({
            name: 'Employability Manager',
            email: gestorEmail,
            password: password,
            role: user_entity_1.UserRole.GESTOR,
        });
        console.log('✅ Gestor user created - Email: gestor@linkenwin.com | Password: gestor123');
    }
    else {
        console.log('ℹ️  Gestor user already exists');
    }
    const coderEmail = 'coder@linkenwin.com';
    const coder = await usersService.findOneByEmail(coderEmail);
    if (!coder) {
        const password = await bcrypt.hash('coder123', 10);
        await usersService.create({
            name: 'John Developer',
            email: coderEmail,
            password: password,
            role: user_entity_1.UserRole.CODER,
        });
        console.log('✅ Coder user created - Email: coder@linkenwin.com | Password: coder123');
    }
    else {
        console.log('ℹ️  Coder user already exists');
    }
    const vacanciesService = app.get(vacancies_service_1.VacanciesService);
    const vacancies = await vacanciesService.findAllAdmin();
    if (vacancies.length === 0) {
        await vacanciesService.create({
            title: 'Frontend Developer',
            description: 'We are looking for a talented Frontend Developer to join our team. You will work on building modern, responsive web applications using React and TypeScript.',
            technologies: 'React, TypeScript, TailwindCSS, Vite',
            seniority: 'Mid',
            softSkills: 'Team collaboration, Communication, Problem-solving',
            location: 'Remote',
            modality: vacancy_entity_1.Modality.REMOTE,
            salaryRange: '$3000 - $4500',
            company: 'Tech Innovations Corp',
            maxApplicants: 5,
        });
        console.log('✅ Frontend Developer vacancy created');
        await vacanciesService.create({
            title: 'Backend Developer',
            description: 'Join our backend team to build scalable APIs and microservices. Experience with NestJS and PostgreSQL is required.',
            technologies: 'NestJS, PostgreSQL, Docker, TypeORM, Redis',
            seniority: 'Senior',
            softSkills: 'Leadership, Mentoring, Critical thinking',
            location: 'New York, USA',
            modality: vacancy_entity_1.Modality.ONSITE,
            salaryRange: '$5000 - $7000',
            company: 'Innovation Labs',
            maxApplicants: 10,
        });
        console.log('✅ Backend Developer vacancy created');
        await vacanciesService.create({
            title: 'QA Engineer',
            description: 'We need a QA Engineer to ensure the quality of our software products. You will design and execute test plans, automate tests, and work closely with development teams.',
            technologies: 'Jest, Cypress, Selenium, Postman, CI/CD',
            seniority: 'Mid',
            softSkills: 'Attention to detail, Analytical thinking, Communication',
            location: 'Hybrid - San Francisco',
            modality: vacancy_entity_1.Modality.HYBRID,
            salaryRange: '$3500 - $5000',
            company: 'Quality First Solutions',
            maxApplicants: 8,
        });
        console.log('✅ QA Engineer vacancy created');
        console.log('\n🎉 All sample data created successfully!');
    }
    else {
        console.log('ℹ️  Vacancies already exist');
    }
    console.log('\n📋 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:  admin@linkenwin.com  | admin123');
    console.log('Gestor: gestor@linkenwin.com | gestor123');
    console.log('Coder:  coder@linkenwin.com  | coder123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map
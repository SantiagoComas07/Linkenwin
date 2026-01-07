import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import type { CreateVacancyDto } from './vacancies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vacancies')
@Controller('vacancies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VacanciesController {
    constructor(private readonly vacanciesService: VacanciesService) { }

    @Post()
    @Roles(UserRole.GESTOR, UserRole.ADMIN)
    create(@Body() createVacancyDto: CreateVacancyDto) {
        return this.vacanciesService.create(createVacancyDto);
    }

    @Get()
    findAll(@Request() req: any) {
        // If Admin or Gestor, maybe show all including inactive? For now, public list is active only.
        // Requirement: "Consultar vacantes existentes" for Coder.
        if (req.user.role === UserRole.ADMIN || req.user.role === UserRole.GESTOR) {
            return this.vacanciesService.findAllAdmin();
        }
        return this.vacanciesService.findAll();
    }

    @Patch(':id/status')
    @Roles(UserRole.GESTOR, UserRole.ADMIN)
    updateStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
        return this.vacanciesService.updateStatus(id, isActive);
    }
}

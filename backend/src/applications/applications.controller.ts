import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @Post()
    @Roles(UserRole.CODER)
    apply(@Request() req: any, @Body('vacancyId') vacancyId: string) {
        return this.applicationsService.apply(req.user.id, vacancyId);
    }

    @Get()
    @Roles(UserRole.GESTOR, UserRole.ADMIN)
    findAll() {
        return this.applicationsService.findAll();
    }

    @Get('my-applications')
    @Roles(UserRole.CODER)
    findMyApplications(@Request() req: any) {
        return this.applicationsService.findByUser(req.user.id);
    }
}

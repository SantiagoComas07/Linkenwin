import { AuthService } from './auth.service';
import type { CreateUserDto } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    login(body: any): Promise<{
        access_token: string;
    }>;
}

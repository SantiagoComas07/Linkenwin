import { UsersService, CreateUserDto } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<User>;
}

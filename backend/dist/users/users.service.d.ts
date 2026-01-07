import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneById(id: string): Promise<User | null>;
}

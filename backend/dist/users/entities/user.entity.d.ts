export declare enum UserRole {
    ADMIN = "admin",
    GESTOR = "gestor",
    CODER = "coder"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

import { User } from "./user";

export interface AuthResponse {
    token: {
        prefix: string;
        token: string;
    };
    user: User;
}
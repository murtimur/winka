import { Authority } from "./authority";
import { Permission } from "./permission";
import { Role } from "./role";
import { Settings } from "./user.settings";

export interface User {
    id?: number;
    username: string;
    status: boolean;
    password: string;
    settings?: Settings;
    permissions: Permission[];
    roles: Role[];
    authorities: Authority[];
}
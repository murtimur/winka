import { Permission } from "./permission";
import { User } from "./user";

export interface Authority {
    id: number;
    permission: Permission;
}
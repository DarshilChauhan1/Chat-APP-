import { Role } from "../enums/role.enum";
export declare const CHECK_ROLE = "check_role";
export declare const Roles: (...requirements: Role[]) => import("@nestjs/common").CustomDecorator<string>;

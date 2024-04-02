import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const CHECK_ROLE = 'check_role'
export const Roles = (...requirements : Role[])=> {
    console.log(requirements)
    return SetMetadata(CHECK_ROLE, requirements);
}
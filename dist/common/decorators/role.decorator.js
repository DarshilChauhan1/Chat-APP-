"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.CHECK_ROLE = void 0;
const common_1 = require("@nestjs/common");
exports.CHECK_ROLE = 'check_role';
const Roles = (...requirements) => {
    console.log(requirements);
    return (0, common_1.SetMetadata)(exports.CHECK_ROLE, requirements);
};
exports.Roles = Roles;
//# sourceMappingURL=role.decorator.js.map
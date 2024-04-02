"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const common_1 = require("@nestjs/common");
class CustomError extends common_1.HttpException {
    constructor(message, status, redirectTo) {
        super({ message, redirectTo }, status);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom.error.js.map
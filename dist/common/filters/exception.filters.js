"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandling = void 0;
const common_1 = require("@nestjs/common");
let ExceptionHandling = class ExceptionHandling {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const exceptionResponse = exception.getResponse();
        const httpStatus = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let responseBody = {
            statusCode: httpStatus,
            message: exceptionResponse['message'] ? exceptionResponse['message'] : 'Something went wrong',
            path: request.url
        };
        if (exceptionResponse['redirectTo'] != "")
            responseBody['redirectTo'] = exceptionResponse['redirectTo'];
        response.status(httpStatus).send(responseBody);
    }
};
exports.ExceptionHandling = ExceptionHandling;
exports.ExceptionHandling = ExceptionHandling = __decorate([
    (0, common_1.Catch)()
], ExceptionHandling);
//# sourceMappingURL=exception.filters.js.map
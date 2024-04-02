import { HttpException, HttpStatus } from "@nestjs/common";
export declare class CustomError extends HttpException {
    constructor(message?: string, status?: HttpStatus, redirectTo?: string);
}

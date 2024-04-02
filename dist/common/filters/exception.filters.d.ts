import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class ExceptionHandling implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}

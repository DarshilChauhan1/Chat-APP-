import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express'

@Catch()
export class ExceptionHandling implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) : void{
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const exceptionResponse = exception.getResponse()

        const httpStatus =  exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

       
        let responseBody = {
            statusCode : httpStatus,
            message : exceptionResponse['message'] ?  exceptionResponse['message'] : 'Something went wrong',
            path : request.url
        }
        if(exceptionResponse['redirectTo'] != "") responseBody['redirectTo'] = exceptionResponse['redirectTo']
        //sending the error response 
        response.status(httpStatus).send(responseBody);
    }

}
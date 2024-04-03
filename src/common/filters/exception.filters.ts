import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express'

@Catch()
export class ExceptionHandling implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) : void{
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : ""

        const httpStatus =  exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        
        console.log(httpStatus)
       
        let responseBody = {
            statusCode : httpStatus,
            message : exceptionResponse['message'] ?  exceptionResponse['message'] : 'Something went wrong',
            path : request.url,
            success : httpStatus == (200 || 201) ? true : false
        }

        //For custom error if we provide redirectTo
        if(exceptionResponse['redirectTo'] != "") responseBody['redirectTo'] = exceptionResponse['redirectTo']
        //sending the error response 
        response.status(httpStatus).send(responseBody);
    }

}
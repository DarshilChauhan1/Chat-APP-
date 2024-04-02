import { HttpException, HttpStatus } from "@nestjs/common";


//Custom Error Class for extra fields
export class CustomError extends HttpException{
    constructor(message? : string, status? : HttpStatus, redirectTo?: string){
        super({message, redirectTo}, status)
    }
}
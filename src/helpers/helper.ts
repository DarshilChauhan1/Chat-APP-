
//Api response
export class ResponseBody {
    statusCode: number;
    message: string;
    data: Object;
    constructor(statusCode ? : number, message ? : string, data ?: Object) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
    }
}


//OtherMembers of the chat 
export const otherMember = (members : any, userId : string) => members.find((member)=> member._id !== userId)
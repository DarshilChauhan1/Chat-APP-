"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otherMember = exports.ResponseBody = void 0;
class ResponseBody {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
exports.ResponseBody = ResponseBody;
const otherMember = (members, userId) => members.filter((member) => member._id, toString() !== userId);
exports.otherMember = otherMember;
//# sourceMappingURL=helper.js.map
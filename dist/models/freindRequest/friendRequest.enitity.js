"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestSchema = exports.FriendRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_entity_1 = require("../user/user.entity");
const friendRequest_enum_1 = require("./friendRequest.enum");
let FriendRequest = class FriendRequest {
};
exports.FriendRequest = FriendRequest;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: friendRequest_enum_1.FriendRequestEnum, default: friendRequest_enum_1.FriendRequestEnum.PENDING }),
    __metadata("design:type", String)
], FriendRequest.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", user_entity_1.User)
], FriendRequest.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] }),
    __metadata("design:type", user_entity_1.User)
], FriendRequest.prototype, "receiver", void 0);
exports.FriendRequest = FriendRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], FriendRequest);
exports.FriendRequestSchema = mongoose_1.SchemaFactory.createForClass(FriendRequest);
//# sourceMappingURL=friendRequest.enitity.js.map
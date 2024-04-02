"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConfigasync = void 0;
const config_1 = require("@nestjs/config");
exports.mongooseConfigasync = {
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        uri: configService.get('MONGODB_URI'),
    }),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=mongooseConfigasync.js.map
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const mongooseConfigasync : MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
    }),
    inject: [ConfigService],
}
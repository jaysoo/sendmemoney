import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiFundraisersModule } from '@sendmemoney/api-fundraisers';
import { ApiFileUploadModule } from '@sendmemoney/api-file-upload';
import { ApiDonationsModule } from '@sendmemoney/api-donations';

const MONGO_HOST = process.env.NX_MONGO_HOST;
const MONGO_DATABASE = process.env.NX_MONGO_DATABASE;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${MONGO_HOST}/${MONGO_DATABASE}`),
    ApiFundraisersModule,
    ApiFileUploadModule,
    ApiDonationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

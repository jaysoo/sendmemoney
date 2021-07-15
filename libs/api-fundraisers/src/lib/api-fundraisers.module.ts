import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FundraiserController } from './fundraiser.controller';
import { FundraiserService } from './fundraiser.service';
import { FundraiserSchema } from './fundraiser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Fundraiser', schema: FundraiserSchema },
    ]),
  ],
  controllers: [FundraiserController],
  providers: [FundraiserService],
  exports: [],
})
export class ApiFundraisersModule {}

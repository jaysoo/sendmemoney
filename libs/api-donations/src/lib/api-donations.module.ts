import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationSchema } from './donation.schema';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Donation', schema: DonationSchema }]),
  ],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [],
})
export class ApiDonationsModule {}

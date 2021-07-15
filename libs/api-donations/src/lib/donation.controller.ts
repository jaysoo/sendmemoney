import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Donation } from '@sendmemoney/shared-models/donation';
import { DonationService } from './donation.service';
import { DonationAddDto } from './donation-add.dto';

@Controller('donations')
export class DonationController {
  constructor(private service: DonationService) {}

  @Get('/latest')
  async getLatestDonations(
    @Query('fundraiser') fundraiser: string
  ): Promise<Donation[]> {
    return this.service.getLatestDonations(fundraiser);
  }

  @Get('/total')
  async getTotalDonation(
    @Query('fundraiser') fundraiser: string
  ): Promise<{ total: number }> {
    return this.service.getTotalDonation(fundraiser);
  }

  @Post()
  async addDonation(@Body() dto: DonationAddDto): Promise<Donation> {
    return await this.service.addDonation(dto);
  }
}

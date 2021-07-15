import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Donation } from '@sendmemoney/shared-models/donation';
import { DonationAddDto } from './donation-add.dto';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel('Donation') private donationModel: Model<Donation>
  ) {}

  async getLatestDonations(fundraiser: string): Promise<Donation[]> {
    return this.donationModel
      .find({ fundraiser })
      .sort('-createdAt')
      .limit(15)
      .exec();
  }

  async getTotalDonation(fundraiser: string): Promise<{ total: number }> {
    const [first] = await this.donationModel.aggregate<{ total: number }>([
      { $match: { fundraiser: Types.ObjectId(fundraiser) } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    if (!first) {
      return { total: 0 };
    }

    return { total: first.total };
  }

  async addDonation(dto: DonationAddDto): Promise<Donation> {
    return this.donationModel.create(dto);
  }
}

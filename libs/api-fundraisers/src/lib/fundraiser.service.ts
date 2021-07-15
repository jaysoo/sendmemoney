import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fundraiser } from '@sendmemoney/shared-models/fundraiser';
import { FundraiserCreateDto } from './fundraiser-create.dto';

@Injectable()
export class FundraiserService {
  constructor(
    @InjectModel('Fundraiser') private fundraiserModel: Model<Fundraiser>
  ) {}

  async findFundraisers(
    page = 1,
    perPage = 10,
    email?: string
  ): Promise<Fundraiser[]> {
    const filter = email ? { email } : undefined;
    return this.fundraiserModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort('-createdAt')
      .exec();
  }

  async getFundraiser(id: string): Promise<Fundraiser> {
    try {
      return await this.fundraiserModel.findById(id);
    } catch {
      throw new NotFoundException();
    }
  }

  async addFundraiser(dto: FundraiserCreateDto): Promise<Fundraiser> {
    return this.fundraiserModel.create(dto);
  }

  async deleteFundraiser(id: string): Promise<void> {
    await this.fundraiserModel.findByIdAndRemove(id);
  }
}

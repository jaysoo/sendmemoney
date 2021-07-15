import { Schema } from 'mongoose';
import { Fundraiser } from '@sendmemoney/shared-models/fundraiser';

export const FundraiserSchema = new Schema<Fundraiser>({
  name: String,
  email: String,
  title: String,
  description: String,
  goal: Number,
  coverUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

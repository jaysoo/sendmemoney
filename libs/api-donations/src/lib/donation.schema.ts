import { Schema } from 'mongoose';
import { Donation } from '@sendmemoney/shared-models/donation';

export const DonationSchema = new Schema<Donation>({
  fundraiser: { type: Schema.Types.ObjectId, ref: 'Fundraiser' },
  name: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

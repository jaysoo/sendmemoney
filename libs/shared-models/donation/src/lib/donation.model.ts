export interface Donation {
  _id: string;
  name: string;
  amount: number;
  createdAt?: Date;
  fundraiser: string;
}

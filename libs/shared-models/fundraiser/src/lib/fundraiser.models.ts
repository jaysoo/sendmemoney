export interface Fundraiser {
  _id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  coverUrl: string;
  goal: number;
  createdAt?: Date;
}

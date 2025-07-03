import { Document } from 'mongoose';

export interface Payment extends Document {
  amount: number;
  description?: string;
  status?: string;
  createdAt?: Date;
}

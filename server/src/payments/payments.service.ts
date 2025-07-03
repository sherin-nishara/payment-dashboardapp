import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './payment.schema';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}

  async findAll(query: any = {}) {
    return this.paymentModel.find(query);
  }

  async findOne(id: string) {
    return this.paymentModel.findById(id);
  }

  async create(data: Partial<Payment>) {
    const payment = new this.paymentModel(data);
    return payment.save();
  }

  async getStats() {
    const [success, failed, latest] = await Promise.all([
      this.paymentModel.countDocuments({ status: 'success' }),
      this.paymentModel.countDocuments({ status: 'failed' }),
      this.paymentModel.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return { success, failed, latest };
  }

}
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sherinnishara:ars3124hussain@cluster0.1xmzhmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    UsersModule,
    PaymentsModule,
  ],
})
export class AppModule {}

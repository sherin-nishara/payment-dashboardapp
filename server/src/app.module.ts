// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    MongooseModule.forRoot('<your-mongodb-atlas-url>'),
    AuthModule,
    UsersModule,
    PaymentsModule,
  ],
})
export class AppModule {}

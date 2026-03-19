import { Module } from '@nestjs/common';
import { CreatePaymentController } from './controllers/create-payment/create-payment.controller';
import { UpdatePaymentController } from './controllers/update-payment/update-payment.controller';
import { GetPaymentController } from './controllers/get-payment/get-payment.controller';

@Module({
  controllers: [CreatePaymentController, UpdatePaymentController, GetPaymentController]
})
export class PaymentsModule {}

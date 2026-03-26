import { Module } from '@nestjs/common';
import { CreatePaymentController } from './controllers/create-payment/create-payment.controller';
import { UpdatePaymentController } from './controllers/update-payment/update-payment.controller';
import { GetPaymentController } from './controllers/get-payment/get-payment.controller';
import { CreatePaymentService } from './services/create-payment/create-payment.service';
import { UpdatePaymentService } from './services/update-payment/update-payment.service';
import { GetPaymentService } from './services/get-payment/get-payment.service';
import {SqliteCreatePayment} from "./repository/SqliteCreatePayment";
import {SqliteUpdatePayment} from "./repository/SqliteUpdatePayment";
import {SqliteGetPayment} from "./repository/SqliteGetPayment";
import {SqliteGetReservation} from "../reservation/repository/SqliteGetReservation";
import {SqliteGetInvoice} from "../invoices/repository/SqliteGetInvoice";

@Module({
  controllers: [CreatePaymentController, UpdatePaymentController, GetPaymentController],
  providers: [CreatePaymentService, UpdatePaymentService, GetPaymentService,
    {
      provide : 'CREATE_PAYMENT_DAO',
      useClass: SqliteCreatePayment,
    },
    {
      provide: 'UPDATE_PAYMENT_DAO',
      useClass: SqliteUpdatePayment,
    },
    {
      provide: 'GET_PAYMENT_DAO',
      useClass: SqliteGetPayment,
    },
    {
      provide: 'GET_RESERVATION_DAO',
      useClass: SqliteGetReservation,
    },
    {
      provide: 'GET_INVOICE_DAO',
      useClass: SqliteGetInvoice,
    }
  ]

})
export class PaymentsModule {}

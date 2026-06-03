import {Module} from '@nestjs/common';
import {CreatePaymentController} from './controllers/create-payment/create-payment.controller';
import {GetPaymentController} from './controllers/get-payment/get-payment.controller';
import {CreatePaymentService} from './services/create-payment/create-payment.service';
import {GetPaymentService} from './services/get-payment/get-payment.service';
import {PaymentsReportController} from './controllers/payments-report/payments-report.controller';
import {PaymentsReportService} from './services/payments-report/payments-report.service';
import {SeasonModule} from '../seasons/season.module';
import {NestEventPublisherAdapter} from '../events/NestEventPublisherAdapter';
import {CqrsModule} from '@nestjs/cqrs';
import {DeletePaymentController} from './controllers/delete-payment/delete-payment.controller';
import {ReservationModule} from '../reservation/reservation.module';
import {InvoicesModule} from '../invoices/invoices.module';
import {PaymentDaoProvider} from './providers/PaymentDaoProvider';
import {PaymentUseCaseProviders} from './providers/PaymentUseCaseProviders';
import {GetPaymentTypesController} from './controllers/get-payment-types/get-payment-types.controller';
import {GetPaymentTypesService} from './services/get-payment-types/get-payment-types.service';
import { ExportPaymentReportController } from './controllers/export-payment-report/export-payment-report.controller';
import { ExportPaymentReportService } from './services/export-payment-report/export-payment-report.service';

@Module({
  imports: [CqrsModule, SeasonModule, ReservationModule, InvoicesModule],
  controllers: [
    CreatePaymentController,
    GetPaymentController,
    PaymentsReportController,
    DeletePaymentController,
    GetPaymentTypesController,
    ExportPaymentReportController,
  ],
  providers: [
    ...PaymentDaoProvider,
    ...PaymentUseCaseProviders,
    {
      provide: 'EVENT',
      useClass: NestEventPublisherAdapter,
    },
    PaymentsReportService,
    CreatePaymentService,
    GetPaymentService,
    GetPaymentTypesService,
    ExportPaymentReportService,
  ],
})
export class PaymentsModule {}

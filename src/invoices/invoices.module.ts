import {Module} from '@nestjs/common';
import {GetInvoiceController} from './controllers/get-invoice/get-invoice.controller';
import {GetInvoiceService} from './services/get-invoice/get-invoice.service';
import {InvoiceDetailsController} from './controllers/invoice-details/invoice-details.controller';
import {InvoiceDetailsService} from './services/invoice-details/invoice-details.service';
import {GetSeasonInvoicesController} from './controllers/get-season-invoices/get-season-invoices.controller';
import {DeleteInvoiceController} from './controllers/delete-invoice/delete-invoice.controller';
import {DeleteInvoiceService} from './services/delete-service/delete-invoice.service';
import {INVOICE_TOKEN} from './INVOICE_TOKEN';
import {InvoiceDaoProviders} from './providers/InvoiceDaoProviders';
import {InvoiceUseCaseProviders} from './providers/InvoiceUseCaseProviders';
import { GetSeasonInvoicesService } from './services/get-season-invoices/get-season-invoices.service';

@Module({
  providers: [
    ...InvoiceDaoProviders,
    ...InvoiceUseCaseProviders,
    GetInvoiceService,
    InvoiceDetailsService,
    DeleteInvoiceService,
    GetSeasonInvoicesService,
  ],
  controllers: [
    GetInvoiceController,
    InvoiceDetailsController,
    GetSeasonInvoicesController,
    DeleteInvoiceController,
  ],
  exports: [INVOICE_TOKEN.DAOS.GET_INVOICE],
})
export class InvoicesModule {}

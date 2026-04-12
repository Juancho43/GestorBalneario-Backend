import { Module } from '@nestjs/common';
import { SqliteGetInvoice } from './repository/SqliteGetInvoice';
import { GetInvoiceController } from './controllers/get-invoice/get-invoice.controller';
import { GetInvoiceService } from './services/get-invoice/get-invoice.service';
import { SqliteGetInvoices } from './repository/SqliteGetInvoices';
import { InvoiceDetailsController } from './controllers/invoice-details/invoice-details.controller';
import { InvoiceDetailsService } from './services/invoice-details/invoice-details.service';
import { SqliteInvoiceDetail } from './repository/SqliteInvoiceDetail';
import { GetSeasonInvoicesController } from './controllers/get-season-invoices/get-season-invoices.controller';
import { DeleteInvoiceController } from './controllers/delete-invoice/delete-invoice.controller';

@Module({
  providers: [
    {
      provide: 'GET_INVOICE',
      useClass: SqliteGetInvoice,
    },
    {
      provide: 'GET_INVOICES',
      useClass: SqliteGetInvoices,
    },
    {
      provide: 'INVOICE_DETAIL',
      useClass: SqliteInvoiceDetail,
    },
    GetInvoiceService,
    InvoiceDetailsService,
  ],
  exports: [],
  controllers: [
    GetInvoiceController,
    InvoiceDetailsController,
    GetSeasonInvoicesController,
    DeleteInvoiceController,
  ],
})
export class InvoicesModule {}

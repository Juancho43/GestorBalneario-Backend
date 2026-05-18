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
import { AddInvoiceItemController } from './controllers/add-invoice-item/add-invoice-item.controller';
import { DeleteInvoiceItemController } from './controllers/delete-invoice-item/delete-invoice-item.controller';
import { PutInvoiceItemController } from './controllers/put-invoice-item/put-invoice-item.controller';
import { PutInvoiceItemService } from './services/put-invoice-item/put-invoice-item.service';
import { DeleteInvoiceItemService } from './services/delete-invoice-item/delete-invoice-item.service';
import {ClientsModule} from "../clients/clients.module";
import {ServicesModule} from "../services/services.module";
import {EventsModule} from "../events/eventsModule";

@Module({
  imports:[ClientsModule,ServicesModule,EventsModule],
  providers: [
    ...InvoiceDaoProviders,
    ...InvoiceUseCaseProviders,
    GetInvoiceService,
    InvoiceDetailsService,
    DeleteInvoiceService,
    GetSeasonInvoicesService,
    PutInvoiceItemService,
    DeleteInvoiceItemService,
  ],
  controllers: [
    GetInvoiceController,
    InvoiceDetailsController,
    GetSeasonInvoicesController,
    DeleteInvoiceController,
    AddInvoiceItemController,
    DeleteInvoiceItemController,
    PutInvoiceItemController,
  ],
  exports: [INVOICE_TOKEN.DAOS.GET_INVOICE],
})
export class InvoicesModule {}

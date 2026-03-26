import { Module } from '@nestjs/common';
import { AddInvoiceItemService } from './services/add-invoice-item/add-invoice-item.service';
import {SqliteGetClientInvoice} from "../clients/repository/SqliteGetClientInvoice";
import {SqliteGetService} from "../services/repository/SqliteGetService";
import {SqliteCreateInvoiceItem} from "../invoices/repository/SqliteCreateInvoiceItem";
import {NestEventPublisherAdapter} from "../events/NestEventPublisherAdapter";
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  imports:[CqrsModule],
  providers: [AddInvoiceItemService,
    {
      provide: 'GET_CLIENT_INVOICE',
      useClass: SqliteGetClientInvoice,
    },
    {
      provide: 'GET_SERVICE',
      useClass:SqliteGetService,
    },
    {
      provide: 'CREATE_INVOICE_ITEM',
      useClass:SqliteCreateInvoiceItem
    },
    {
      provide: 'EVENT',
      useClass: NestEventPublisherAdapter
    }

  ],
  exports:[AddInvoiceItemService]
})
export class BillingModule {}

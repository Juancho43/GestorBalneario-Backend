import { Module } from '@nestjs/common';
import {SqliteGetInvoice} from "./repository/SqliteGetInvoice";
import { GetInvoiceController } from './controllers/get-invoice/get-invoice.controller';
import { GetInvoicesController } from './controllers/get-invoices/get-invoices.controller';
import { GetInvoicesService } from './services/get-invoices/get-invoices.service';
import { GetInvoiceService } from './services/get-invoice/get-invoice.service';
import {SqliteGetInvoices} from "./repository/SqliteGetInvoices";

@Module({
    providers:[
        {
            provide: 'GET_INVOICE',
            useClass: SqliteGetInvoice,
        },
        {
            provide:'GET_INVOICES',
            useClass: SqliteGetInvoices
        },
        GetInvoicesService,
        GetInvoiceService
    ],
    exports: [],
    controllers: [GetInvoiceController, GetInvoicesController]
})
export class InvoicesModule {}

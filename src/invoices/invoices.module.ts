import { Module } from '@nestjs/common';
import {SqliteGetInvoice} from "./repository/SqliteGetInvoice";
import { GetInvoiceController } from './controllers/get-invoice/get-invoice.controller';
import { GetInvoicesController } from './controllers/get-invoices/get-invoices.controller';
import { GetInvoicesService } from './services/get-invoices/get-invoices.service';
import { GetInvoiceService } from './services/get-invoice/get-invoice.service';
import {SqliteGetInvoices} from "./repository/SqliteGetInvoices";
import { InvoiceDetailsController } from './controllers/invoice-details/invoice-details.controller';
import { InvoiceDetailsService } from './services/invoice-details/invoice-details.service';
import {SqliteInvoiceDetail} from "./repository/SqliteInvoiceDetail";

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
        {
            provide:'INVOICE_DETAIL',
            useClass: SqliteInvoiceDetail
        },
        GetInvoicesService,
        GetInvoiceService,
        InvoiceDetailsService
    ],
    exports: [],
    controllers: [GetInvoiceController, GetInvoicesController, InvoiceDetailsController]
})
export class InvoicesModule {}

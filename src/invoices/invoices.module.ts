import { Module } from '@nestjs/common';
import {SqliteGetInvoice} from "./repository/SqliteGetInvoice";

@Module({
    providers:[
        {
            provide: 'GET_INVOICE_DAO',
            useClass: SqliteGetInvoice,
        }
    ],
    exports: []
})
export class InvoicesModule {}

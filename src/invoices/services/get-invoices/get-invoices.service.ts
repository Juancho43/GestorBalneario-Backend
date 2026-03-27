import {Inject, Injectable, Logger} from '@nestjs/common';
import type {GetInvoicesDAO} from "../../../../core/Invoice/Model/DAO/GetInvoicesDAO";
import {GetInvoices} from "../../../../core/Invoice/Application/GetInvoices";
import {InvoiceResponse} from "../../../../core/Invoice/Application/DTO/InvoiceResponse";

@Injectable()
export class GetInvoicesService {
    private logger = new Logger(GetInvoicesService.name);
    private useCase: GetInvoices;
    constructor(@Inject('GET_INVOICES') implementation: GetInvoicesDAO) {
        this.useCase = new GetInvoices(implementation);
    }

    async execute(query: null){
        try {
            this.logger.debug('Getting Invoices');
            return InvoiceResponse.createList(await this.useCase.execute(query));
        }catch (error) {
            this.logger.error('Error getting invoices:', error);
            return  error;
        }
    }
}

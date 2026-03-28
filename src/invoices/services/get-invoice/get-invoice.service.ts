import {Inject, Injectable, Logger } from '@nestjs/common';
import type {GetInvoiceDAO} from "../../../../core/Invoice/Model/DAO/GetInvoiceDAO";
import {GetInvoice} from "../../../../core/Invoice/Application/GetInvoice";
import {InvoiceResponse} from "../../../../core/Invoice/Application/DTO/InvoiceResponse";

@Injectable()
export class GetInvoiceService {
    private logger = new Logger(GetInvoiceService.name);
    private useCase : GetInvoice;

    constructor(@Inject('GET_INVOICE')  dao: GetInvoiceDAO) {
        this.useCase = new GetInvoice(dao);
    }

    async execute(id:string){
        try{
            this.logger.debug('Getting Invoice');
            return InvoiceResponse.create(await this.useCase.execute(id));
        }catch(err){
            this.logger.error(err.name);
            return err;
        }
    }
}

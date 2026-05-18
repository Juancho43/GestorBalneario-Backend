import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteInvoiceItem} from "../../../../core/Invoice/Application/UseCase/DeleteInvoiceItem";
import {DeleteInvoiceItemCommand} from "../../../../core/Invoice/Application/Commands/DeleteInvoiceItemCommand";
import {INVOICE_TOKEN} from "../../INVOICE_TOKEN";

@Injectable()
export class DeleteInvoiceItemService {
    private logger = new Logger(DeleteInvoiceItemService.name);
    constructor(@Inject(INVOICE_TOKEN.USECASE.INVOICE_ITEM_DELETE) private useCase : DeleteInvoiceItem){
    }
    async execute(request: DeleteInvoiceItemCommand){
        try{
            this.logger.debug('Executing DeleteInvoiceItemService',request);
            return await this.useCase.execute(request)
        } catch(error) {
            this.logger.error(error);
            throw error;
        }
    }
}

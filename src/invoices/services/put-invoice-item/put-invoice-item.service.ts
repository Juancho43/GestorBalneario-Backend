import {Inject, Injectable, Logger} from '@nestjs/common';
import {UpdateInvoiceItem} from "../../../../core/Invoice/Application/UseCase/UpdateInvoiceItem";
import {UpdateInvoiceItemCommand} from "../../../../core/Invoice/Application/Commands/UpdateInvoiceItemCommand";
import {INVOICE_TOKEN} from "../../INVOICE_TOKEN";

@Injectable()
export class PutInvoiceItemService {
    private logger = new Logger(PutInvoiceItemService.name);
    constructor(@Inject(INVOICE_TOKEN.USECASE.INVOICE_ITEM_UPDATE) private useCase: UpdateInvoiceItem) {
    }
    async execute(command: UpdateInvoiceItemCommand) {
        try{
            this.logger.debug('Updating invoice item', command);
            return await this.useCase.execute(command);
        }catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}

import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddInvoiceItemCommand} from "../../../core/Billing/Application/DTO/AddInvoiceItemCommand";
import {AddInvoiceItemService} from "../services/add-invoice-item/add-invoice-item.service";
import {Inject, Logger} from "@nestjs/common";

@CommandHandler(AddInvoiceItemCommand)
export class AddInvoiceItemHandler implements ICommandHandler<AddInvoiceItemCommand> {
    private readonly logger = new Logger(AddInvoiceItemHandler.name);
    constructor(@Inject() private service: AddInvoiceItemService){}
    async execute(command: AddInvoiceItemCommand) {
        try {
            this.logger.log('Creating invoice item');
            return await this.service.execute(command);
        }catch (e) {
           this.logger.error(e.message);
        }
    }
}
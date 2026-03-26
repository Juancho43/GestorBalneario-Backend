import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddInvoiceItemCommand} from "../../../core/Billing/Application/DTO/AddInvoiceItemCommand";
import {AddInvoiceItemService} from "../services/add-invoice-item/add-invoice-item.service";
import {Inject, Logger} from "@nestjs/common";

@CommandHandler(AddInvoiceItemCommand)
export class CreateInvoiceHandler implements ICommandHandler<AddInvoiceItemCommand> {
    private readonly logger = new Logger(CreateInvoiceHandler.name);
    constructor(@Inject() private service: AddInvoiceItemService,){}
    async execute(command: AddInvoiceItemCommand) {
        try {
            this.logger.log('Creating invoice item:',command);
            return await this.service.execute(command);
        }catch (e) {
           this.logger.error(e.message);
        }
    }
}
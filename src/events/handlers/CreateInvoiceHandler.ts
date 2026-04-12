import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInvoiceItemService } from '../services/add-invoice-item/add-invoice-item.service';
import { Inject, Logger } from '@nestjs/common';
import { AddInvoiceItemCommand } from '../../../core/Invoice/Application/Commands/AddInvoiceItemCommand';

@CommandHandler(AddInvoiceItemCommand)
export class AddInvoiceItemHandler implements ICommandHandler<AddInvoiceItemCommand> {
  private readonly logger = new Logger(AddInvoiceItemHandler.name);
  constructor(@Inject() private service: AddInvoiceItemService) {}
  async execute(command: AddInvoiceItemCommand) {
    try {
      this.logger.log('Creating invoice item');
      return await this.service.execute(command);
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}

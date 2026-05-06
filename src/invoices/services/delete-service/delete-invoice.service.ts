import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeleteCommand} from '../../../../core/common/Application/DeleteCommand';
import {DeleteInvoice} from '../../../../core/Invoice/Application/UseCase/CRUD/DeleteInvoice';
import {INVOICE_TOKEN} from '../../INVOICE_TOKEN';

@Injectable()
export class DeleteInvoiceService {
  private logger = new Logger(DeleteInvoiceService.name);

  constructor(
    @Inject(INVOICE_TOKEN.USECASE.DELETE_INVOICE)
    private useCase: DeleteInvoice,
  ) {}

  execute(command: DeleteCommand) {
    try {
      this.logger.debug('Executing DeleteInvoiceService', command);
      return this.useCase.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

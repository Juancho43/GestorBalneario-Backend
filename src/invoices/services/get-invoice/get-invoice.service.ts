import {Inject, Injectable, Logger} from '@nestjs/common';
import {GetInvoice} from '../../../../core/Invoice/Application/UseCase/CRUD/GetInvoice';
import {InvoiceResponse} from '../../../../core/Invoice/Application/DTO/InvoiceResponse';
import {GetByIdQuery} from '../../../../core/common/Application/GetByIdQuery';
import {INVOICE_TOKEN} from '../../INVOICE_TOKEN';

@Injectable()
export class GetInvoiceService {
  private logger = new Logger(GetInvoiceService.name);
  constructor(
    @Inject(INVOICE_TOKEN.USECASE.GET_INVOICE) private useCase: GetInvoice,
  ) {}
  async execute(id: GetByIdQuery) {
    try {
      this.logger.debug('Getting Invoice');
      return InvoiceResponse.create(await this.useCase.execute(id));
    } catch (err) {
      this.logger.error(err.name);
      return err;
    }
  }
}

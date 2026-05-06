import {Inject, Injectable, Logger} from '@nestjs/common';
import {InvoiceDetails} from '../../../../core/Invoice/Application/UseCase/InvoiceDetails';
import {InvoiceDetailQuery} from '../../../../core/Invoice/Application/Queries/InvoiceDetailQuery';
import {INVOICE_TOKEN} from '../../INVOICE_TOKEN';

@Injectable()
export class InvoiceDetailsService {
  private logger = new Logger(InvoiceDetailsService.name);

  constructor(
    @Inject(INVOICE_TOKEN.USECASE.INVOICE_DETAILS)
    private useCase: InvoiceDetails,
  ) {}

  execute(query: InvoiceDetailQuery) {
    try {
      this.logger.debug('Getting details of invoice:', query);
      return this.useCase.execute(query);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import type { InvoiceDetailDAO } from '../../../../core/Invoice/Application/Interfaces/InvoiceDetailDAO';
import { InvoiceDetails } from '../../../../core/Invoice/Application/UseCase/InvoiceDetails';
import { InvoiceDetailQuery } from '../../../../core/Invoice/Application/Queries/InvoiceDetailQuery';

@Injectable()
export class InvoiceDetailsService {
  private useCase: InvoiceDetails;
  private logger = new Logger(InvoiceDetailsService.name);
  constructor(@Inject('INVOICE_DETAIL') dao: InvoiceDetailDAO) {
    this.useCase = new InvoiceDetails(dao);
  }
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

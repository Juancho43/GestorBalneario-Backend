import {BaseDomainEvent} from '../../../common/Application/BaseDomainEvent';

export class InvoiceItemUpdated extends BaseDomainEvent {
  constructor(invoiceId: string) {
    super(invoiceId, 'invoices.item.updated');
  }
}

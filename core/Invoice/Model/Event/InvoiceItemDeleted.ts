import {BaseDomainEvent} from '../../../common/Application/BaseDomainEvent';

export class InvoiceItemDeleted extends BaseDomainEvent {
  constructor(invoiceId: string) {
    super(invoiceId, 'invoices.item.deleted');
  }
}

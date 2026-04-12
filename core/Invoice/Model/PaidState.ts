import { InvoiceState } from './InvoiceState';
import { InvoiceItem } from './InvoiceItem';
import { Payment } from '../../Payment/Model/Payment';
import { Invoice } from './Invoice';
import { ModifyPaidInvoiceError } from './Errors/ModifyPaidInvoice';

export class PaidState implements InvoiceState {
  constructor(private invoice: Invoice) {}

  addItem(item: InvoiceItem): void {
    throw new ModifyPaidInvoiceError('Cannot add items.');
  }

  addPayment(payment: Payment): void {
    throw new ModifyPaidInvoiceError('Cannot add payments.');
  }

  delete(): void {}

  getInvoice(): Invoice {
    return this.invoice;
  }

  update(): void {}
  toString(): string {
    return PaidState.name;
  }
}

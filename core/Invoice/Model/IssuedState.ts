import {InvoiceState} from './InvoiceState';
import {InvoiceItem} from './InvoiceItem';
import {Payment} from '../../Payment/Model/Payment';
import {Invoice} from './Invoice';
import {PaidState} from './PaidState';

export class IssuedState implements InvoiceState {
  constructor(private invoice: Invoice) {}

  addItem(item: InvoiceItem): void {
    this.invoice.items.push(item);
    this.invoice.updateAmount();
  }

  addPayment(payment: Payment): void {
    const totalPaid = this.invoice.calculateTotalPaid();
    if (totalPaid > this.invoice.amount.finalAmount) {
      throw new Error('Payment exceeds the total amount due.');
    }
    this.invoice.payments.push(payment);
    if (this.invoice.calculateTotalPaid() == this.invoice.amount.finalAmount) {
      this.invoice.state = new PaidState(this.invoice);
    }
  }

  getInvoice(): Invoice {
    return this.invoice;
  }

  update(): void {}

  delete(): void {}
  toString(): string {
    return IssuedState.name;
  }
}

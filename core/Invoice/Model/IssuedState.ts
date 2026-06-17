import {InvoiceState} from './InvoiceState';
import {InvoiceItem} from './InvoiceItem';
import {Payment} from '../../Payment/Model/Payment';
import {Invoice} from './Invoice';
import {PaidState} from './PaidState';
import {EntityNotFoundError} from "../../common/Model/Errors/EntityNotFound";
import {UUID} from "../../common/Model/UUID";

export class IssuedState implements InvoiceState {
  constructor(private invoice: Invoice) {}

  updateItem(item: InvoiceItem): void {
    const currentItems = this.invoice.items;
    const exists = currentItems.some(i => i.getId().value === item.getId().value);
    if (!exists) {
      throw new EntityNotFoundError('Item',item.getId().value);
    }
    const updatedItems = currentItems.map(currentItem =>
        currentItem.getId().value === item.getId().value ? item : currentItem
    );
    this.invoice.updateItemsCollection(updatedItems);
    this.update();
    this.invoice.updateAmount();
  }

  removeItem(item: UUID): void {
    const currentItems = this.invoice.items;
    const itemExists = currentItems.some(i => i.getId().value === item.value);
    if (!itemExists) {
      throw new EntityNotFoundError('Item',item.value);
    }
    const filteredItems = currentItems.filter(
        currentItem => currentItem.getId().value !== item.value
    );
    this.invoice.updateItemsCollection(filteredItems);
    this.update();
    this.invoice.updateAmount();
  }

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
      this.invoice.closeDate = new Date();
    }
  }

  getInvoice(): Invoice {
    return this.invoice;
  }

  update(): void {
    this.getInvoice().timestamps.update();
  }

  delete(): void {
    this.getInvoice().softDelete.apply();
  }
  toString(): string {
    return IssuedState.name;
  }
}

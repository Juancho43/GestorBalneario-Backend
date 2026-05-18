import {InvoiceState} from './InvoiceState';
import {InvoiceItem} from './InvoiceItem';
import {Payment} from '../../Payment/Model/Payment';
import {Invoice} from './Invoice';
import {ModifyPaidInvoiceError} from './Errors/ModifyPaidInvoice';
import {UUID} from "../../common/Model/UUID";

export class PaidState implements InvoiceState {
  constructor(private invoice: Invoice) {}

  updateItem(item: InvoiceItem): void {
    throw new ModifyPaidInvoiceError('Cannot update items.');
  }
  removeItem(item: UUID): void {
    throw new ModifyPaidInvoiceError('Cannot remove items.');
  }

  addItem(item: InvoiceItem): void {
    throw new ModifyPaidInvoiceError('Cannot add items.');
  }

  addPayment(payment: Payment): void {
    throw new ModifyPaidInvoiceError('Cannot add payments.');
  }

  delete(): void {
    throw new ModifyPaidInvoiceError('Cannot delete a paid invoice.');
  }

  getInvoice(): Invoice {
    return this.invoice;
  }

  update(): void {
    throw new ModifyPaidInvoiceError('Cannot update a paid invoice.');
  }
  toString(): string {
    return PaidState.name;
  }
}

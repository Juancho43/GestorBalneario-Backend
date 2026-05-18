import {Invoice} from './Invoice';
import {InvoiceItem} from './InvoiceItem';
import {Payment} from '../../Payment/Model/Payment';
import {UUID} from "../../common/Model/UUID";

export interface InvoiceState {
  toString(): string;
  getInvoice(): Invoice;
  addItem(item: InvoiceItem): void;
  updateItem(item: InvoiceItem): void;
  removeItem(item: UUID):void;
  addPayment(payment: Payment): void;
  delete(): void;
  update(): void;
}

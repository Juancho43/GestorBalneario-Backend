import {InvoiceItem} from "../InvoiceItem";
import {Invoice} from "../Invoice";

export interface CreateInvoiceItemDAO{
    create(item: InvoiceItem,invoice: Invoice): Promise<void>;
}
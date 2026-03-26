import {InvoiceItem} from "../InvoiceItem";

export interface CreateInvoiceItemDAO{
    create(item: InvoiceItem): Promise<void>;
}
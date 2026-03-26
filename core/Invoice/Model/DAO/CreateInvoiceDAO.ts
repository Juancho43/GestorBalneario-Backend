import {Invoice} from "../Invoice";

export interface CreateInvoiceDAO{
    create(invoice: Invoice): Promise<void>
}
import {Invoice} from "../../Model/Invoice";
import {InvoiceItem} from "../../Model/InvoiceItem";

export class DeleteInvoiceItemDTO{
    constructor(
        public invoice: Invoice,
        public itemId: string
    ) {
    }

}
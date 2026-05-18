import {Invoice} from "../../Model/Invoice";
import {InvoiceItem} from "../../Model/InvoiceItem";

export class UpdateInvoiceItemDTO{
     constructor(
        public invoice: Invoice,
        public item: InvoiceItem
    ) {
    }
}
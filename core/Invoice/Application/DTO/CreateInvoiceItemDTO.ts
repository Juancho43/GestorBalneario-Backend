import { Invoice } from "core/Invoice/Model/Invoice";
import {InvoiceItem} from "../../Model/InvoiceItem";

export class CreateInvoiceItemDTO {
    constructor(
        public invoice: Invoice,
        public item: InvoiceItem
    ) {
    }
}
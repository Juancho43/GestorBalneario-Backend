import {Invoice} from "../../Model/Invoice";

export class DeleteInvoiceItemDTO{
    constructor(
        public invoice: Invoice,
        public itemId: string
    ) {
    }

}
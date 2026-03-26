import {BaseDomainEvent} from "../../../common/Application/BaseDomainEvent";

export class InvoiceItemAdded extends BaseDomainEvent{
    constructor(
        invoiceId: string,
    ) {
        super(invoiceId, 'invoices.item.created');
    }
}
export class DeleteInvoiceItemCommand{
    constructor(public invoiceId: string, public itemId: string) {
    }
}
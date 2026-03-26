export class CreateInvoiceCommand {
    constructor(public reservationId: string, public clientId: string) {
    }
}
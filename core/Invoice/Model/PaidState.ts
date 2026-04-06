import {InvoiceState} from "./InvoiceState";
import {InvoiceItem} from "./InvoiceItem";
import {Payment} from "../../Payment/Model/Payment";
import {Invoice} from "./Invoice";

export class PaidState implements InvoiceState {

    constructor(private invoice: Invoice) {
    }

    addItem(item: InvoiceItem): void {
        throw new Error("Cannot add items to an already paid invoice.");
    }

    addPayment(payment: Payment): void {
        throw new Error("Cannot add payment to an already paid invoices.");
    }

    delete(): void {
    }

    getInvoice(): Invoice {
        return this.invoice;
    }

    update(): void {
    }
    toString(): string {
        return PaidState.name;
    }

}
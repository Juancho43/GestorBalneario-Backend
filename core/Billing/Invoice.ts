import {UniqueIdentifier} from "../common/Model/UniqueIdentifier";
import {InvoiceItem} from "./InvoiceItem";
import {Money} from "../Payment/Model/Money";
import {Payment} from "../Payment/Model/Payment";

export class Invoice{
    private id: UniqueIdentifier;
    private date: Date;
    private amount: Money;
    private clientId: UniqueIdentifier;
    private items: InvoiceItem[] = [];
    private payments: UniqueIdentifier[] = [];

    calculateTotalAmount(): number{
       return this.items.reduce((total, item) => total += (item.getPrice().finalAmount), 0);
    }

    calculateTotalPaid(payments: Payment[]): number {
        for (const payment of payments) {
            if (!this.payments.some(id => id.equals(payment.id))) {
                throw new Error(`El pago ${payment.id.value} no pertenece a esta factura`);
            }
        }
        return payments.reduce((total, p) => total + p.finalAmount, 0);
    }

    addItem(item: InvoiceItem) {
        this.items.push(item);
    }
    addPayment(payment: UniqueIdentifier) {
        this.payments.push(payment);
    }


}
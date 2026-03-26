import {UUID} from "../../common/Model/UUID";
import {InvoiceItem} from "./InvoiceItem";
import {Money} from "../../Payment/Model/Money";
import {Payment} from "../../Payment/Model/Payment";
import {InvoiceStatus, InvoiceStatusEnum} from "../../Billing/Model/DAO/InvoiceStatus";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";


export class Invoice{
    private _id: UUID;
    private _date: Date;
    private _amount: Money;
    private _clientId: UUID;
    private _status: InvoiceStatus;
    private _items: InvoiceItem[] = [];
    private _payments: Payment[] = [];
    private _timestamps: Timestamps;
    private _softDelete: SoftDelete;
    private constructor(
        id:UUID,
        date:Date,
        clientId:UUID,
        timestamps:Timestamps,
        softDelete:SoftDelete,
    ) {
        this._id=id;
        this._date=date;
        this._clientId=clientId;
        this._status= InvoiceStatus.create(InvoiceStatusEnum.CREATED);
        this._amount = Money.create(1);
        this._timestamps = timestamps;
        this._softDelete = softDelete;
    }
    static create(
        id:UUID,
        date:Date,
        clientId:UUID,
        timestamps:Timestamps,
        softDelete:SoftDelete,
    ){
        return new Invoice(id,date,clientId,timestamps,softDelete);
    }

    updateAmount(){
        this._amount = Money.create(this.calculateTotalAmount());
    }

    calculateTotalAmount(): number{
        return this._items.reduce((total, item) => total += (item.getPrice().finalAmount), 0);
    }

    calculateTotalPaid(): number {
        return this._payments.reduce((total, p) => total + p.finalAmount, 0);
    }
    get status(){
        return this._status;
    }
    addItem(item: InvoiceItem) {
        this._items.push(item);
        // this.updateAmount();
    }

    addPayment(payment: Payment) {
        if (this._status.isPaid()) {
            throw new Error("Cannot add payment to an already paid invoices.");
        }
        const totalPaid = this.calculateTotalPaid();
        if (totalPaid > this._amount.finalAmount) {
            throw new Error("Payment exceeds the total amount due.");
        }
        this._payments.push(payment);
        if(this.calculateTotalPaid() == this._amount.finalAmount){
            this._status = InvoiceStatus.create(InvoiceStatusEnum.PAID);
        }
    }
    get id():UUID{
        return this._id;
    }


    get date(): Date {
        return this._date;
    }

    get amount(): Money {
        return this._amount;
    }

    get clientId(): UUID {
        return this._clientId;
    }

    get items(): InvoiceItem[] {
        return this._items;
    }

    get payments(): Payment[] {
        return this._payments;
    }

    get timestamps(): Timestamps {
        return this._timestamps;
    }

    get softDelete(): SoftDelete {
        return this._softDelete;
    }
}
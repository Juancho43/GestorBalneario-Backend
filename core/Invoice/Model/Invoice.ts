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
    private items: InvoiceItem[] = [];
    private payments: Payment[] = [];
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
        return this.items.reduce((total, item) => total += (item.getPrice().finalAmount), 0);
    }

    calculateTotalPaid(): number {
        return this.payments.reduce((total, p) => total + p.finalAmount, 0);
    }
    get status(){
        return this._status;
    }
    addItem(item: InvoiceItem) {
        this.items.push(item);
        this.updateAmount();
    }

    addPayment(payment: Payment) {
        if (this._status.isPaid()) {
            throw new Error("Cannot add payment to an already paid invoices.");
        }
        const totalPaid = this.calculateTotalPaid();
        if (totalPaid > this._amount.finalAmount) {
            throw new Error("Payment exceeds the total amount due.");
        }
        this.payments.push(payment);
        if(this.calculateTotalPaid() == this._amount.finalAmount){
            this._status = InvoiceStatus.create(InvoiceStatusEnum.PAID);
        }
    }
    get id():UUID{
        return this.id;
    }
}
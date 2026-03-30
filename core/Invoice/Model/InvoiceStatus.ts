export enum InvoiceStatusEnum {
    SENT = "SENT",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
    OVERDUE = "OVERDUE",
    CREATED = "CREATED",
}
export class InvoiceStatus{
    private readonly _value: InvoiceStatusEnum;
    private constructor(value: InvoiceStatusEnum) {
        this._value = value;
    }
    static create(value: InvoiceStatusEnum) {
        return new InvoiceStatus(value);
    }

    get value(){
        return this._value;
    }
    isPaid(){
        return this._value === InvoiceStatusEnum.PAID
    }
}
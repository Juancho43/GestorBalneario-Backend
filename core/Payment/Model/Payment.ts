import {PaymentType} from "./PaymentType";
import {StringObject} from "../../common/Model/StringObject";

export class Payment{
    private _id:string;
    private _date:Date;
    private _type: PaymentType;
    private _amount:number;
    private _changeType:number;
    private _finalAmount:number;
    private _description?: StringObject;

    private constructor(id:string,date:Date,type:PaymentType,amount:number,changeType:number, description?: StringObject) {
        this.validatePositiveAmount(amount);
        this.validatePositiveAmount(changeType);
        this._description = description;
        this._id = id;
        this._date = date;
        this._type = type;
        this._amount = amount;
        this._changeType = changeType;
        this._finalAmount = this.calculateFinalAmount();
    }

    static create(id:string,date:Date,type:PaymentType,amount:number,changeType:number = 1, description: StringObject):Payment{
        return new Payment(id,date,type,amount,changeType,description)
    }

    private validatePositiveAmount(amount: number): void {
        if (amount <= 0) {
            throw new Error("Payment amount must be positive.");
        }
    }

    private calculateFinalAmount(): number {
        // Ejemplo: 100 (USD) * 1000 (Rate) = 100,000 (Local)
        return this._amount * this._changeType;
    }

    get id(): string {
        return this._id;
    }

    get date(): Date {
        return this._date;
    }

    get type(): PaymentType {
        return this._type;
    }

    get amount(): number {
        return this._amount;
    }

    get changeType(): number {
        return this._changeType;
    }

    get finalAmount(): number {
        return this._finalAmount;
    }

    get description(): StringObject {
        return this._description!;
    }
}
import {PaymentType} from "./PaymentType";
import {StringObject} from "../../common/Model/StringObject";
import {UniqueIdentifier} from "../../common/Model/UniqueIdentifier";
import {Money} from "./Money";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {type} from "node:os";
import {timestamp} from "rxjs";
export class Payment {
    private constructor(
        private readonly _id: UniqueIdentifier,
        private readonly _date: Date,
        private readonly _type: PaymentType,
        private readonly _money: Money,
        private readonly _description: StringObject,
        private readonly _timestamp: Timestamps,
        private readonly _softDelete: SoftDelete,
    ) {
    }

    static create(
        id: UniqueIdentifier,
        date: Date,
        type: PaymentType,
        money: Money,
        description: StringObject,
        timestamp: Timestamps,
        softDelete: SoftDelete,
    ): Payment {
        return new Payment(id, date, type, money,description,timestamp,softDelete);
    }

    get finalAmount(): number {
        return this._money.finalAmount;
    }

    get money(): Money {
        return this._money;
    }

    get id(): UniqueIdentifier { return this._id; }
    get date(): Date { return this._date; }
    get type(): PaymentType { return this._type; }
    get description(): StringObject | undefined { return this._description; }


    get timestamp(): Timestamps {
        return this._timestamp;
    }

    get softDelete(): SoftDelete {
        return this._softDelete;
    }
}
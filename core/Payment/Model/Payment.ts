import {PaymentType} from "./PaymentType";
import {StringObject} from "../../common/Model/StringObject";
import {UniqueIdentifier} from "../../common/Model/UniqueIdentifier";
import {Money} from "./Money";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
export class Payment {
    private constructor(
        private readonly _id: UniqueIdentifier,
        private readonly _date: Date,
        private readonly _type: PaymentType,
        private readonly _money: Money,
        private readonly _reservationId:UniqueIdentifier,
        private readonly _description: StringObject,
        private readonly _timestamp: Timestamps,
        private readonly _softDelete: SoftDelete,
    ) {
        // La validación ya ocurrió dentro de Money.create()
    }

    static create(
        id: UniqueIdentifier,
        date: Date,
        type: PaymentType,
        money: Money,
        reservationId:UniqueIdentifier,
        description: StringObject,
        timestamp: Timestamps = Timestamps.create(),
        softDelete: SoftDelete = SoftDelete.empty()
    ): Payment {
        // Creamos el VO aquí o lo recibimos por parámetro
        return new Payment(id, date, type, money,reservationId,description,timestamp,softDelete);
    }

    // Encapsulamos el acceso a través de la moneda
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
}
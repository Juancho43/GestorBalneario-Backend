import {UUID} from "../../common/Model/UUID";
import {StringObject} from "../../common/Model/StringObject";
import {Money} from "../../Payment/Model/Money";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {timestamp} from "rxjs";

export class Service{
    private _id : UUID;
    private _name : StringObject;
    private _price: Money;
    private _timestamp: Timestamps;
    private _softDelete: SoftDelete;


    private constructor(id: UUID, name: StringObject, price: Money, timestamp: Timestamps, softDelete: SoftDelete) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._timestamp = timestamp;
        this._softDelete = softDelete;
    }

    static create(id: UUID, name: StringObject, price: Money, timestamp: Timestamps, softDelete: SoftDelete){
        return new Service(id, name, price, timestamp, softDelete);
    }
    get timestamp(): Timestamps {
        return this._timestamp;
    }

    get softDelete(): SoftDelete {
        return this._softDelete;
    }

    get id(): UUID {
        return this._id;
    }

    get name(): StringObject {
        return this._name;
    }

    get price(): Money {
        return this._price;
    }

}
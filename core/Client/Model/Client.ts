import {StringObject} from "../../common/Model/StringObject";
import {EmailObject} from "../../common/Model/EmailObject";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {UUID} from "../../common/Model/UUID";

export class Client{
    private _id:UUID;
    private _name:StringObject;
    private _email:EmailObject;
    private _phone:StringObject;
    private _invoices: UUID[];
    private _timestamp: Timestamps;
    private _softDelete: SoftDelete;
    private constructor(id:UUID, name:StringObject, email:EmailObject, phone:StringObject, timestamp:Timestamps, softDelete:SoftDelete){
        this._id=id;
        this._name=name;
        this._email=email;
        this._phone=phone;
        this._timestamp=timestamp;
        this._softDelete=softDelete;
    }

    static create(id:UUID, name:StringObject, email:EmailObject, phone:StringObject, timestamp:Timestamps, softDelete:SoftDelete){
        return new Client(id,name,email,phone,timestamp,softDelete);
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

    get email(): EmailObject {
        return this._email;
    }

    get phone(): StringObject {
        return this._phone;
    }
}
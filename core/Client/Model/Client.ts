import {StringObject} from "../../common/Model/StringObject";
import {EmailObject} from "../../common/Model/EmailObject";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {UniqueIdentifier} from "../../common/Model/UniqueIdentifier";

export class Client{
    private _id:UniqueIdentifier;
    private _name:StringObject;
    private _email:EmailObject;
    private _phone:StringObject;
    private _invoices: UniqueIdentifier[];
    private _timestamp: Timestamps;
    private _softDelete: SoftDelete;
    private constructor(id:UniqueIdentifier,name:StringObject,email:EmailObject,phone:StringObject, timestamp:Timestamps,softDelete:SoftDelete){
        this._id=id;
        this._name=name;
        this._email=email;
        this._phone=phone;
        this._timestamp=timestamp;
        this._softDelete=softDelete;
    }

    static create(id:UniqueIdentifier,name:StringObject,email:EmailObject,phone:StringObject, timestamp:Timestamps,softDelete:SoftDelete){
        return new Client(id,name,email,phone,timestamp,softDelete);
    }


    get timestamp(): Timestamps {
        return this._timestamp;
    }

    get softDelete(): SoftDelete {
        return this._softDelete;
    }

    get id(): UniqueIdentifier {
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
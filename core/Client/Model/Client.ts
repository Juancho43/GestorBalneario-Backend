import {StringObject} from "../../common/Model/StringObject";
import {EmailObject} from "../../common/Model/EmailObject";

export class Client{
    private _id:string;
    private _name:StringObject;
    private _email:EmailObject;
    private _phone:StringObject;

    private constructor(id:string,name:StringObject,email:EmailObject,phone:StringObject){
        this._id=id;
        this._name=name;
        this._email=email;
        this._phone=phone;
    }

    static create(id,name:StringObject,email:EmailObject,phone:StringObject){
        return new Client(id,name,email,phone);
    }


    get id(): string {
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
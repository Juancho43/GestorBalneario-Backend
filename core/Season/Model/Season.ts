import {UUID} from "../../common/Model/UUID";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {StringObject} from "../../common/Model/StringObject";

export class Season{
    private _id: UUID;
    private _startDate: Date;
    private _endDate: Date;
    private _name: StringObject;
    private _isActive: boolean = false;
    private _timestamps: Timestamps;
    private _softDelete: SoftDelete;

    private constructor(
        id: UUID,
        isActive: boolean,
        startDate: Date,
        endDate: Date,
        name: StringObject,
        timestamps: Timestamps,
        softDelete: SoftDelete
    ) {
        this._id = id;
        this._isActive = isActive;
        this._startDate = startDate;
        this._endDate = endDate;
        this._name = name;
        this._timestamps = timestamps;
        this._softDelete = softDelete;
    }

    static create(id: UUID, isActive: boolean,startDate: Date, endDate: Date,name: StringObject, timestamps: Timestamps, softDelete: SoftDelete): Season {
        if (endDate <= startDate) {
            throw new Error("La fecha de finalización debe ser posterior a la fecha de inicio.");
        }
       return new Season(id, isActive, startDate, endDate, name, timestamps, softDelete);
    }
    toggleActive(){
        this._isActive = !this._isActive;
    }
    get isActive(){
        return this._isActive;
    }
    get timestamps(): Timestamps {
        return this._timestamps;
    }

    get softDelete(): SoftDelete {
        return this._softDelete;
    }

    get id(): UUID {
        return this._id;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date {
        return this._endDate;
    }

    get name(): StringObject {
        return this._name;
    }
}
import {UUID} from "../../common/Model/UUID";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";

export class Season{
    private _id: UUID;
    private shadows: UUID[];
    private services: UUID[];
    private _startDate: Date;
    private _endDate: Date;
    private invoices: UUID[];
    private _timestamps: Timestamps;
    private _softDelete: SoftDelete;

    private constructor(id: UUID, startDate: Date, endDate: Date,timestamps: Timestamps, softDelete: SoftDelete) {
        this._id = id;
        this._startDate = startDate;
        this._endDate = endDate;
        this._timestamps = timestamps;
        this._softDelete = softDelete;
    }

    static create(id: UUID, startDate: Date, endDate: Date,timestamps: Timestamps, softDelete: SoftDelete): Season {
        if (endDate <= startDate) {
            throw new Error("La fecha de finalización debe ser posterior a la fecha de inicio.");
        }
       return new Season(id, startDate, endDate,timestamps, softDelete);
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
}
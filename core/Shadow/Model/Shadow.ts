import {ShadowType} from "./ValueObjects/ShadowType";
import {Coords} from "../../common/Model/Coords";
import {StringObject} from "../../common/Model/StringObject";
import {Reservation} from "../../Reservation/Model/Reservation";
import {UUID} from "../../common/Model/UUID";
import {Timestamps} from "../../common/Model/Timestamps";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {Booking} from "../../Reservation/Model/Booking";

/**
 * Sombra
 * Carpa-sombrilla
 */
export class Shadow{
    private readonly _id: UUID;
    private  _identifier: StringObject;
    private  _type: ShadowType;
    private  _coords: Coords;
    private _timestamp: Timestamps;
    private _softDelete: SoftDelete;
    private constructor(id: UUID, identifier: StringObject, type: ShadowType, coords: Coords, timestamp: Timestamps, softDelete: SoftDelete) {
        this._id = id;
        this._identifier = identifier;
        this._type = type;
        this._coords = coords;
        this._timestamp = timestamp;
        this._softDelete = softDelete;
    }

    static create(id:UUID, identifier: StringObject, type: ShadowType, coords: Coords, timestamp: Timestamps, softDelete: SoftDelete): Shadow {
        return new Shadow(id, identifier, type, coords, timestamp, softDelete);
    }

    canBeReserved(dates: Booking, reservations: Reservation[]): boolean {
        let isAvailable = true;
        if (this._softDelete.isDeleted) isAvailable = false;

        const hasOverlap = reservations.some(reservation => {
            reservation.booking.overlapsWith(dates);
        })
        if (hasOverlap) isAvailable = false;
        return isAvailable;
    }

    get id(): UUID {
        return this._id;
    }

    get identifier(): StringObject {
        return this._identifier;
    }

    get type(): ShadowType {
        return this._type;
    }
    get coords(): Coords {
        return this._coords;
    }

    get timestamp(): Timestamps {
        return this._timestamp;
    }

    get softDelete(): SoftDelete {
        return this._softDelete;
    }
}
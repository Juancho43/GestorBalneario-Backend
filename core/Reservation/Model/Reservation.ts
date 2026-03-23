import {Booking} from "./Booking";
import {UniqueIdentifier} from "../../common/Model/UniqueIdentifier";
import {Payment} from "../../Payment/Model/Payment";
import {SoftDelete} from "../../common/Model/SoftDelete";
import {Timestamps} from "../../common/Model/Timestamps";

export class Reservation{
    private _id: UniqueIdentifier;
    private _client: UniqueIdentifier;
    private _shadow: UniqueIdentifier;
    private _booking: Booking;
    private _timestamp: Timestamps;
    private _softDelete: SoftDelete;


    private constructor(id: UniqueIdentifier,client: UniqueIdentifier, shadow: UniqueIdentifier, booking: Booking, timestamp: Timestamps, softDelete: SoftDelete) {
        this._id = id;
        this._client = client;
        this._shadow = shadow;
        this._booking = booking;
        this._timestamp = timestamp;
        this._softDelete = softDelete;
    }
    public static create(id: UniqueIdentifier,client: UniqueIdentifier, shadow: UniqueIdentifier, booking: Booking, timestamp:Timestamps,softdelete:SoftDelete): Reservation {
        if (!client || !shadow || !booking){
            throw new Error("Invalid reservation data: All fields are required.");
        }
        return new Reservation(id,client, shadow, booking,timestamp,softdelete);
    }




    /**
     * Calcula la duración total de la reserva en días.
     * Utiliza la lógica del objeto Booking.
     */
    public getDurationInDays(): number {
        const diffTime = Math.abs(this._booking.checkOut.getTime() - this._booking.checkIn.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }



    get id(): UniqueIdentifier {
        return this._id;
    }
    get booking(): Booking {
        return this._booking;
    }
    get client(): UniqueIdentifier {
        return this._client;
    }
    get shadow(): UniqueIdentifier {
        return this._shadow;
    }
    get timestamp(): Timestamps {
        return this._timestamp;
    }
    get softDelete(): SoftDelete {
        return this._softDelete;
    }
}

import {UUID} from "../../core/common/Model/UUID";
import {Booking} from "../../core/Reservation/Model/Booking";
import {SoftDelete} from "../../core/common/Model/SoftDelete";
import {Timestamps} from "../../core/common/Model/Timestamps";
import {BookingMother} from "./BookingMother";
import {Reservation} from "../../core/Reservation/Model/Reservation";


export class ReservationMother{
    static create(
        id: UUID = UUID.create(),
        client: UUID = UUID.create(),
        shadow: UUID = UUID.create(),
        booking: Booking = BookingMother.create(),
        timestamp =  Timestamps.create(),
        softDelete = SoftDelete.empty(),
    ): Reservation {
        return Reservation.create(
            id,
            client,
            shadow,
            booking,
            timestamp,
            softDelete
        );
    }
}
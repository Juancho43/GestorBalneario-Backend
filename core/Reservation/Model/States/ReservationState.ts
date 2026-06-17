import {Booking} from "../Booking";
import {Reservation} from "../Reservation";
import {Client} from "../../../Client/Model/Client";
import {Shadow} from "../../../Shadow/Model/Shadow";

export interface ReservationState {
    checkIn(client:Client, shadow: Shadow): void;
    checkOut(client:Client): void;
    reschedule(shadow: Shadow, booking: Booking) : boolean;
    cancel(): void;
    update() : void;
    delete() : void;
    getReservation(): Reservation;
}
import {Booking} from "../Booking";
import {Reservation} from "../Reservation";
import {Client} from "../../../Client/Model/Client";
import {Shadow} from "../../../Shadow/Model/Shadow";

export interface ReservationState {
    update() : void;
    delete() : void;
    reschedule(shadow: Shadow, booking: Booking) : boolean;
    cancel(): void;
    finish(): void;
    getReservation(): Reservation;
    toString(): string;
    checkIn(client:Client): void;

}
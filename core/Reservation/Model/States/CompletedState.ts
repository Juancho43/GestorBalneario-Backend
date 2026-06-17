import {ReservationState} from "./ReservationState";
import {Booking} from "../Booking";
import {Reservation} from "../Reservation";
import {Client} from "../../../Client/Model/Client";
import {InvalidReservationActionError} from "../InvalidReservationActionError";
import {Shadow} from "../../../Shadow/Model/Shadow";

export class CompletedState  implements ReservationState {
    private readonly reservation : Reservation;

    constructor(reservation: Reservation) {
        this.reservation = reservation;
    }

    checkIn(): void {
        throw new InvalidReservationActionError(this.toString(), 'checkIn');
    }

    checkOut(): void {
        throw new InvalidReservationActionError(this.toString(), 'finish');
    }

    reschedule(): boolean {
        throw new InvalidReservationActionError(this.toString(), 'reschedule');
    }

    update(): void {
        throw new InvalidReservationActionError(this.toString(), 'update');
    }

    delete(): void {
        this.reservation.softDelete.apply();
    }
    cancel(): void {
        throw new InvalidReservationActionError(this.toString(), 'cancel');
    }
    getReservation(): Reservation {
        return this.reservation;
    }

    toString(): string {
        return CompletedState.name;
    }
}
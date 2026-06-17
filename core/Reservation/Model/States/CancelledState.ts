import {ReservationState} from "./ReservationState";
import {Reservation} from "../Reservation";
import {InvalidReservationActionError} from "../InvalidReservationActionError";

export class CancelledState  implements ReservationState {
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
    cancel(): void {
        throw new InvalidReservationActionError(this.toString(), 'cancel');
    }
    update(): void {
        throw new InvalidReservationActionError(this.toString(), 'reschedule');
    }

    delete(): void {
        this.reservation.softDelete.apply();
    }
    getReservation(): Reservation {
        return this.reservation;
    }

    toString(): string {
        return CancelledState.name;
    }
}

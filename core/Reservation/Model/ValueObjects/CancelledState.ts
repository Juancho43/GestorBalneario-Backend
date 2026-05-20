import {ReservationState} from "./ReservationState";
import {Booking} from "../Booking";
import {Reservation} from "../Reservation";
import {Client} from "../../../Client/Model/Client";
import {InvalidReservationActionError} from "../InvalidReservationActionError";
import {Shadow} from "../../../Shadow/Model/Shadow";

export class CancelledState  implements ReservationState {
    private readonly reservation : Reservation;

    constructor(reservation: Reservation) {
        this.reservation = reservation;
    }

    cancel(): void {
        throw new InvalidReservationActionError(this.toString(), 'cancel');
    }

    delete(): void {
        this.reservation.softDelete.apply();
    }

    finish(): void {
        throw new InvalidReservationActionError(this.toString(), 'finish');
    }
    reschedule(shadow:Shadow, booking: Booking): boolean {
        throw new InvalidReservationActionError(this.toString(), 'reschedule');
    }

    update(): void {
        throw new InvalidReservationActionError(this.toString(), 'reschedule');
    }

    getReservation(): Reservation {
        return this.reservation;
    }
    toString(): string {
        return CancelledState.name;
    }

    checkIn(client: Client): void {
        throw new InvalidReservationActionError(this.toString(), 'checkIn');
    }
}

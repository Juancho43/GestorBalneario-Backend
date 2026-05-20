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

    cancel(): void {
        throw new InvalidReservationActionError(this.toString(), 'cancel');
    }

    finish(): void {
        throw new InvalidReservationActionError(this.toString(), 'finish');
    }

    reschedule(shadow: Shadow, booking: Booking): boolean {
        throw new InvalidReservationActionError(this.toString(), 'reschedule');
    }

    update(): void {
        throw new InvalidReservationActionError(this.toString(), 'update');
    }

    delete(): void {
        this.reservation.softDelete.apply();
    }
    getReservation(): Reservation {
        return this.reservation;
    }
    toString(): string {
        return CompletedState.name;
    }

    checkIn(client: Client): void {
        throw new InvalidReservationActionError(this.toString(), 'checkIn');
    }
}
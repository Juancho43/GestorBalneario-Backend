import {ReservationState} from "./ReservationState";
import {Booking} from "../Booking";
import {Reservation} from "../Reservation";
import {Client} from "core/Client/Model/Client";
import {Shadow} from "core/Shadow/Model/Shadow";
import {InvalidReservationActionError} from "../InvalidReservationActionError";
import {CompletedState} from "./CompletedState";

export class ActiveState implements ReservationState {
    private readonly reservation: Reservation;

    constructor(reservation: Reservation) {
        this.reservation = reservation;
    }

    reschedule(shadow: Shadow, booking: Booking): boolean {
        if (this.reservation.shadow.value !== shadow.id.value) {
            throw new Error('You can only reschedule to the same shadow');
        }
        if (this.reservation.booking.checkIn.getTime() !== booking.checkIn.getTime()) {
            throw new Error('You can only reschedule to the same check-in date');
        }
        const isAvailable = shadow.canBeReserved(booking, this.reservation.id);
        if (!isAvailable) {
            throw new Error('The requested extension dates are not available.');
        }
        return true;
    }

    checkIn(client: Client): void {
        throw new InvalidReservationActionError(this.toString(), 'checkIn');
    }

    cancel(): void {
        throw new InvalidReservationActionError(this.toString(), 'cancel');
    }

    delete(): void {
        this.reservation.softDelete.apply();
    }

    finish(): void {
        this.reservation.setState(new CompletedState(this.reservation))
    }

    update(): void {
        this.reservation.timestamp.update();
    }
    getReservation(): Reservation {
        return this.reservation;
    }
    toString(): string {
        return ActiveState.name;
    }
}
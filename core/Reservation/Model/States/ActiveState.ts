import {ReservationState} from "./ReservationState";
import {Booking} from "../Booking";
import {Reservation} from "../Reservation";
import {Client} from "core/Client/Model/Client";
import {Shadow} from "core/Shadow/Model/Shadow";
import {InvalidReservationActionError} from "../InvalidReservationActionError";
import {CompletedState} from "./CompletedState";
import {CancelledState} from "./CancelledState";

export class ActiveState implements ReservationState {
    private readonly reservation: Reservation;

    constructor(reservation: Reservation) {
        this.reservation = reservation;
    }

    checkIn(): void {
        throw new InvalidReservationActionError(this.toString(), 'checkIn');
    }

    checkOut(client: Client): void {
        if(this.reservation.client.value !== client.id.value){
            throw new Error('Client does not match the reservation');
        }
        this.reservation.checkOut =  new Date();
        this.reservation.setState(new CompletedState(this.reservation))
        this.update();
    }

    reschedule(shadow: Shadow, booking: Booking): boolean {
        if (this.reservation.shadow.value !== shadow.id.value) {
            throw new Error('You can only reschedule to the same shadow');
        }
        if (this.reservation.booking.startDate.getTime() !== booking.startDate.getTime()) {
            throw new Error('You can only reschedule to the same check-in date');
        }
        const isAvailable = shadow.canBeReserved(booking, this.reservation.id);
        if (!isAvailable) {
            throw new Error('The requested extension dates are not available.');
        }
        return true;
    }

    cancel(): void {
        this.reservation.setState(new CancelledState(this.reservation))
        this.reservation.checkOut =  new Date();
        this.update();
    }
    update(): void {
        this.reservation.timestamp.update();
    }
    delete(): void {
        this.reservation.softDelete.apply();
    }
    getReservation(): Reservation {
        return this.reservation;
    }
    toString(): string {
        return ActiveState.name;
    }
}
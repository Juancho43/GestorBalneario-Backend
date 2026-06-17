import {CompletedState} from "../../core/Reservation/Model/States/CompletedState";
import {Reservation} from "../../core/Reservation/Model/Reservation";
import {ShadowMother} from "../mothers/ShadowMother";
import {ClientMother} from "../mothers/ClientMother";
import {ReservationMother} from "../mothers/ReservationMother";
import {InvalidReservationActionError} from "../../core/Reservation/Model/InvalidReservationActionError";
import {BookingMother} from "../mothers/BookingMother";
import {vi} from "vitest";

describe('Reservation Completed State', () => {
    let reservationMock: Reservation;
    let state: CompletedState;

    beforeEach(() => {
        const shadow = ShadowMother.create();
        const client = ClientMother.create();

        reservationMock = ReservationMother.create({
            shadow: shadow.id,
            client: client.id,
        });

        Object.defineProperty(reservationMock, 'softDelete', {
            value: { apply: vi.fn() },
            writable: true
        });

        state = new CompletedState(reservationMock);
    });

    it('should throw InvalidReservationActionError on checkIn attempt', () => {
        const client = ClientMother.create();
        expect(() => state.checkIn(client)).toThrow(InvalidReservationActionError);
    });

    it('should throw InvalidReservationActionError on cancel attempt', () => {
        expect(() => state.cancel()).toThrow(InvalidReservationActionError);
    });

    it('should throw InvalidReservationActionError on finish attempt', () => {
        expect(() => state.checkOut()).toThrow(InvalidReservationActionError);
    });

    it('should throw InvalidReservationActionError on reschedule attempt', () => {
        const shadow = ShadowMother.create();
        const booking = BookingMother.create();
        expect(() => state.reschedule(shadow, booking as any)).toThrow(InvalidReservationActionError);
    });

    it('should throw InvalidReservationActionError on update attempt', () => {
        expect(() => state.update()).toThrow(InvalidReservationActionError);
    });

    it('should successfully apply soft delete', () => {
        state.delete();

        expect(reservationMock.softDelete.apply).toHaveBeenCalledTimes(1);
    });

    it('should return the correct state name', () => {
        expect(state.toString()).toBe('CompletedState');
    });
});
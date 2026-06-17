import { CancelledState } from "../../core/Reservation/Model/States/CancelledState";
import { Reservation } from "../../core/Reservation/Model/Reservation";
import { InvalidReservationActionError } from "../../core/Reservation/Model/InvalidReservationActionError";
import { ReservationMother } from "../mothers/ReservationMother";
import { ShadowMother } from "../mothers/ShadowMother";
import { BookingMother } from "../mothers/BookingMother";
import { ClientMother } from "../mothers/ClientMother";
import { vi } from "vitest";

describe('Reservation Cancelled State', () => {
    let reservationMock: Reservation;
    let state: CancelledState;

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

        state = new CancelledState(reservationMock);
    });

    it('should violently reject a checkIn attempt', () => {
        const client = ClientMother.create();
        expect(() => state.checkIn(client)).toThrow(InvalidReservationActionError);
    });

    it('should violently reject a cancel attempt (already cancelled)', () => {
        expect(() => state.cancel()).toThrow(InvalidReservationActionError);
    });

    it('should violently reject a finish attempt', () => {
        expect(() => state.checkOut()).toThrow(InvalidReservationActionError);
    });

    it('should violently reject a reschedule attempt', () => {
        const shadow = ShadowMother.create();
        const booking = BookingMother.create();
        expect(() => state.reschedule(shadow, booking as any)).toThrow(InvalidReservationActionError);
    });

    it('should violently reject an update attempt', () => {
        expect(() => state.update()).toThrow(InvalidReservationActionError);
    });

    it('should execute the soft delete exactly as commanded', () => {
        state.delete();

        expect(reservationMock.softDelete.apply).toHaveBeenCalledTimes(1);
    });

    it('should identify itself correctly', () => {
        expect(state.toString()).toBe('CancelledState');
    });
});
import { ActiveState } from "../../core/Reservation/Model/States/ActiveState";
import { CompletedState } from "../../core/Reservation/Model/States/CompletedState";
import { Reservation } from "../../core/Reservation/Model/Reservation";
import { InvalidReservationActionError } from "../../core/Reservation/Model/InvalidReservationActionError";
import { ReservationMother } from "../mothers/ReservationMother";
import { ShadowMother } from "../mothers/ShadowMother";
import { BookingMother } from "../mothers/BookingMother";
import { ClientMother } from "../mothers/ClientMother";
import { Shadow } from "../../core/Shadow/Model/Shadow";
import { Client } from "../../core/Client/Model/Client";
import { Booking } from "../../core/Reservation/Model/Booking";
import { vi } from "vitest";

describe('Reservation Active State', () => {
    let reservationMock: Reservation;
    let state: ActiveState;
    let shadow: Shadow;
    let client: Client;
    let originalBooking: Booking;

    beforeEach(() => {
        shadow = ShadowMother.create();
        client = ClientMother.create();

        originalBooking = BookingMother.create();

        reservationMock = ReservationMother.create({
            shadow: shadow.id,
            client: client.id,
            booking: originalBooking
        });

        shadow.addReservation?.(reservationMock);

        state = new ActiveState(reservationMock);
    });

    it('should successfully reschedule if check-in matches, shadow matches, and dates are available', () => {
        const newBooking = BookingMother.create({ checkIn: originalBooking.startDate });

        vi.spyOn(shadow, 'canBeReserved').mockReturnValue(true);

        const result = state.reschedule(shadow, newBooking as any);

        expect(result).toBe(true);
    });

    it('should throw Error if trying to reschedule to a different shadow', () => {
        const differentShadow = ShadowMother.create();
        const newBooking = BookingMother.create({ checkIn: originalBooking.startDate });

        expect(() => state.reschedule(differentShadow, newBooking as any))
            .toThrow('You can only reschedule to the same shadow');
    });

    it('should throw Error if trying to change the check-in date', () => {
        const differentDate = new Date(originalBooking.startDate.getTime() + 86400000);
        const newBooking = BookingMother.create({ checkIn: differentDate });

        expect(() => state.reschedule(shadow, newBooking as any))
            .toThrow('You can only reschedule to the same check-in date');
    });

    it('should throw Error if requested extension dates are not available', () => {
        const newBooking = BookingMother.create({ checkIn: originalBooking.startDate });

       vi.spyOn(shadow, 'canBeReserved').mockReturnValue(false);

        expect(() => state.reschedule(shadow, newBooking as any))
            .toThrow('The requested extension dates are not available.');
    });

    it('should throw InvalidReservationActionError on check-in attempt', () => {
        expect(() => state.checkIn()).toThrow(InvalidReservationActionError);
    });


    it('should transition to CompletedState on finish', () => {
        vi.spyOn(reservationMock, 'setState');

        state.checkOut(client);

        expect(reservationMock.setState).toHaveBeenCalledWith(expect.any(CompletedState));
    });
});
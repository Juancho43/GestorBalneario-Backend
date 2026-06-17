import {CreatedState} from "../../core/Reservation/Model/States/CreatedState";
import {Reservation} from "../../core/Reservation/Model/Reservation";
import {NotAvailableDate} from "../../core/Shadow/Model/NotAvailableDate";
import {ActiveState} from "../../core/Reservation/Model/States/ActiveState";
import {CancelledState} from "../../core/Reservation/Model/States/CancelledState";
import {InvalidReservationActionError} from "../../core/Reservation/Model/InvalidReservationActionError";
import {ReservationMother} from "../mothers/ReservationMother";
import {ShadowMother} from "../mothers/ShadowMother";
import {BookingMother} from "../mothers/BookingMother";
import {Shadow} from "../../core/Shadow/Model/Shadow";
import {ClientMother} from "../mothers/ClientMother";
import {Client} from "../../core/Client/Model/Client";
import { vi } from "vitest";

describe('Reservation Created State', () => {
    let reservationMock: Reservation;
    let state: CreatedState;
    let shadow: Shadow;
    let client: Client;

    beforeEach(() => {
        shadow = ShadowMother.create();
        client = ClientMother.create();
        reservationMock = ReservationMother.create({shadow: shadow.id, client: client.id});
        shadow.addReservation(reservationMock);
        state = new CreatedState(reservationMock)
    });

    it('should successfully reschedule if dates are available and shadow matches', () => {
        const booking = BookingMother.create()

        const result = state.reschedule(shadow , booking as any);

        expect(result).toBe(true);
    });

    it('should throw Error if trying to reschedule to a different shadow', () => {
        const shadow = ShadowMother.create();
        const booking = BookingMother.create()

        expect(() => state.reschedule(shadow, booking ))
            .toThrow('You can only reschedule to the same shadow');
    });

    it('should throw NotAvailableDate if requested dates are not available', () => {
        const booking = BookingMother.create();
        vi.spyOn(shadow, 'canBeReserved').mockReturnValue(false);
        expect(() => state.reschedule(shadow, booking as any)).toThrow(NotAvailableDate);
    });

    it('should transition to ActiveState on valid check-in', () => {
        vi.spyOn(shadow, 'canBeReserved').mockReturnValue(true);
        state.checkIn(client,shadow);
        expect(reservationMock.state.toString()).toBe(ActiveState.name);
    });

    it('should throw Error on check-in if client does not match', () => {
        const client =ClientMother.create();
        expect(() => state.checkIn(client,shadow))
            .toThrow('Client does not match the reservation');
    });

    it('should transition to CancelledState on cancel', () => {
        state.cancel();
        expect(reservationMock.state.toString()).toBe(CancelledState.name);
    });

    it('should throw InvalidReservationActionError on finish', () => {
        expect(() => state.checkOut()).toThrow(InvalidReservationActionError);
    });
})
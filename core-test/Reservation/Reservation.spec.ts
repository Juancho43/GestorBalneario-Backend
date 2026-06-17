import {Reservation} from "../../core/Reservation/Model/Reservation";
import {Shadow} from "../../core/Shadow/Model/Shadow";
import {Client} from "../../core/Client/Model/Client";
import {Booking} from "../../core/Reservation/Model/Booking";
import {ShadowMother} from "../mothers/ShadowMother";
import {ClientMother} from "../mothers/ClientMother";
import {ReservationMother} from "../mothers/ReservationMother";
import {BookingMother} from "../mothers/BookingMother";
import {ActiveState} from "../../core/Reservation/Model/States/ActiveState";
import {CompletedState} from "../../core/Reservation/Model/States/CompletedState";
import {CancelledState} from "../../core/Reservation/Model/States/CancelledState";
import {InvalidReservationActionError} from "../../core/Reservation/Model/InvalidReservationActionError";
import {vi} from "vitest";
describe('Reservation Domain Entity', () => {
  let reservation : Reservation;
  let shadow : Shadow;
  let client : Client;
  let originalBookingDates: Booking;

  beforeEach(() => {
    shadow = ShadowMother.create();
    client = ClientMother.create();
    originalBookingDates = BookingMother.create();
    reservation = ReservationMother.create({
      shadow: shadow.id,
      client: client.id,
      booking: originalBookingDates
    })
  })
  describe('Happy path', ()=>{
    it('Should be created', () => {
      expect(reservation).toBeDefined();
      expect(reservation).toBeInstanceOf(Reservation);
    });
    it('Should have a estimated startDate, and close date',()=>{
      expect(reservation.booking.startDate).toBeInstanceOf(Date);
      expect(reservation.booking.endDate).toBeInstanceOf(Date);
    })
    it('Should have a real checkIn and checkOut date',()=>{
      expect(reservation.checkIn).toBeNull()
      expect(reservation.checkOut).toBeNull();
    })
    it('Should be able to a client to checkIn',()=>{
      reservation.clientCheckIn(client,shadow)
      expect(reservation.checkIn).toBeInstanceOf(Date);
      expect(reservation.state.toString()).toEqual(ActiveState.name)
    })
    it('should be able to a client to end the reservation normally', () => {
      reservation.clientCheckIn(client,shadow);
      reservation.clientCheckOut(client);
      expect(reservation.checkOut).toBeInstanceOf(Date);
      expect(reservation.state.toString()).toEqual(CompletedState.name)
    });
    it('Should be able to a client to cancel the reservation',()=>{
      reservation.clientCheckIn(client,shadow);
      reservation.cancel();
      expect(reservation.checkOut).toBeInstanceOf(Date);
      expect(reservation.state.toString()).toEqual(CancelledState.name)
    })
    it('Should be able to reschedule an active reservation',()=>{
      reservation.clientCheckIn(client,shadow);
      const newBookingDates = BookingMother.create({checkIn: originalBookingDates.startDate})
      reservation.reschedule(shadow,newBookingDates);
      expect(reservation.booking.startDate).toEqual(originalBookingDates.startDate);
      expect(reservation.booking.endDate).toEqual(newBookingDates.endDate);
    })
    it('Should be able to reschedule a created reservation',()=>{
      const newBookingDates = BookingMother.create()
      reservation.reschedule(shadow,newBookingDates);
      expect(reservation.booking.startDate).toEqual(newBookingDates.startDate);
      expect(reservation.booking.endDate).toEqual(newBookingDates.endDate);
    })
    it('Should not be able to reschedule a canceled or completed reservation ', () => {
      const newBookingDates = BookingMother.create()
      reservation.cancel()
      expect(()=>reservation.reschedule(shadow,newBookingDates)).toThrow(InvalidReservationActionError);
    });
    it('Should be able to update its timestamps',()=>{
        const originalTimestamp = reservation.timestamp;
        reservation.update();
        expect(reservation.timestamp.updatedAt).not.toBe(originalTimestamp);
    })
    it('Should be able to soft delete itself',()=>{
      reservation.delete();
      expect(reservation.softDelete.value).toBeInstanceOf(Date);
    })
  })

  describe('Edge cases',()=>{

    it('Should not allow to checkIn before the estimated startDate if the shadow is occupied', () => {
      const spy = vi.spyOn(shadow,"isAvailable").mockReturnValue(false);
      expect(() => {
        reservation.clientCheckIn(client,shadow);
      }).toThrow();

      expect(spy).toHaveBeenCalled();
    });
    it('Should allow to checkIn before the estimated startDate if the shadow is not occupied', () => {
      const spy = vi.spyOn(shadow,"isAvailable").mockReturnValue(true);
      reservation.clientCheckIn(client,shadow);
      expect(reservation.checkIn).toBeInstanceOf(Date);
      expect(reservation.state.toString()).toEqual(ActiveState.name)
      expect(spy).toHaveBeenCalled();
    })
    it('Should not allow the checkOut before the checkIn', ()=>{
         expect(() => { reservation.clientCheckOut(client)}).toThrow();
    })
  })

});
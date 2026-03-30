import { Booking } from '../../core/Reservation/Model/Booking';

export class BookingMother {
  public static create(
    checkIn: Date = new Date('2025-07-01'),
    checkOut: Date = new Date('2025-07-10'),
  ): Booking {
    return Booking.create(checkIn, checkOut);
  }
}

// test/mothers/BookingMother.ts

import {Booking} from '../../core/Reservation/Model/Booking';

export class BookingMother {
  static create(
    overrides: Partial<{
      checkIn: Date;
      checkOut: Date;
    }> = {},
  ): Booking {
    // Default: Una semana de reserva empezando hoy
    const defaultCheckIn = new Date();
    const defaultCheckOut = new Date();
    defaultCheckOut.setDate(defaultCheckIn.getDate() + 7);

    const checkIn = overrides.checkIn ?? defaultCheckIn;
    const checkOut = overrides.checkOut ?? defaultCheckOut;

    return Booking.create(checkIn, checkOut);
  }

  /**
   * Crea un booking de un solo día (el "pasante")
   */
  static singleDay(date: Date = new Date()): Booking {
    const checkOut = new Date(date);
    checkOut.setHours(date.getHours() + 8); // 8 horas de estadía
    return this.create({ checkIn: date, checkOut });
  }
}

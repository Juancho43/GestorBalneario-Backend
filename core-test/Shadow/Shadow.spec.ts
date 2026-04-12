import { ShadowMother } from '../mothers/ShadowMother';
import { UUID } from '../../core/common/Model/UUID';
import { ShadowType } from '../../core/Shadow/Model/ValueObjects/ShadowType';
import { Timestamps } from '../../core/common/Model/Timestamps';
import { SoftDelete } from '../../core/common/Model/SoftDelete';
import { StringObject } from '../../core/common/Model/StringObject';
import { Coords } from '../../core/common/Model/Coords';
import { Shadow } from '../../core/Shadow/Model/Shadow';
import { ReservationMother } from '../mothers/ReservationMother';
import { BookingMother } from '../mothers/BookingMother';
import { Reservation } from '../../core/Reservation/Model/Reservation';
import { NotAvailableDate } from '../../core/Shadow/Model/NotAvailableDate';

describe('Shadow Domain Entity', () => {
  let shadow: Shadow;
  let id: UUID;
  let type: ShadowType;
  let identifier: StringObject;
  let coords: Coords;
  let timestamps: Timestamps;
  let softDelete: SoftDelete;
  let reservation: Reservation;
  beforeEach(() => {
    id = UUID.create();
    type = ShadowType.create('Carpa');
    identifier = StringObject.create('Carpa 1');
    coords = Coords.create(10, 10);
    timestamps = Timestamps.create();
    softDelete = SoftDelete.empty();
    shadow = ShadowMother.create({
      id: id,
      identifier: identifier,
      type: type,
      coords: coords,
      timestamp: timestamps,
      softDelete: softDelete,
    });
    reservation = ReservationMother.create({
      booking: BookingMother.create({
        checkIn: new Date('2020-01-01'),
        checkOut: new Date('2020-01-30'),
      }),
    });
    shadow.addReservation(reservation);
  });
  it('Should be created', () => {
    expect(shadow.id).toBe(id);
    expect(shadow.type).toBe(type);
    expect(shadow.identifier).toBe(identifier);
    expect(shadow.coords).toBe(coords);
    expect(shadow.timestamp).toBe(timestamps);
    expect(shadow.softDelete).toBe(softDelete);
  });
  it('should check reservation overlaps', () => {
    const reservation2 = ReservationMother.create({
      booking: BookingMother.create({
        checkIn: new Date('2020-02-20'),
        checkOut: new Date('2020-02-25'),
      }),
    });
    expect(shadow.canBeReserved(reservation2.booking)).toBe(true);
  });
  it('Should not be reserved', () => {
    const reservation2 = ReservationMother.create({
      booking: BookingMother.create({
        checkIn: new Date('2020-01-20'),
        checkOut: new Date('2020-02-25'),
      }),
    });
    expect(shadow.canBeReserved(reservation2.booking)).toBe(false);
  });
  it('Should be reservable', () => {
    const booking = BookingMother.create();
    expect(shadow.canBeReserved(booking)).toBe(true);
  });

  it('should have state', () => {
    expect(shadow.state).toBeDefined();
  });
  it('Should throw error if is not avaiable', () => {
    const reservation2 = ReservationMother.create({
      booking: BookingMother.create({
        checkIn: new Date('2020-01-20'),
        checkOut: new Date('2020-02-25'),
      }),
    });
    expect(() => {
      shadow.addReservation(reservation2);
    }).toThrow(NotAvailableDate);
  });
});

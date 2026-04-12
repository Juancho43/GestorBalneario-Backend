import { ShadowType } from './ValueObjects/ShadowType';
import { Coords } from '../../common/Model/Coords';
import { StringObject } from '../../common/Model/StringObject';
import { Reservation } from '../../Reservation/Model/Reservation';
import { UUID } from '../../common/Model/UUID';
import { Timestamps } from '../../common/Model/Timestamps';
import { SoftDelete } from '../../common/Model/SoftDelete';
import { Booking } from '../../Reservation/Model/Booking';
import { Prototype } from '../../common/Model/Prototype';
import { ShadowState } from './ValueObjects/ShadowState';
import { AvailableState } from './ValueObjects/AvailableState';
import { BookedState } from './ValueObjects/OccupaidState';
import { Entity } from '../../common/Model/Entity';
import { NotAvailableDate } from './NotAvailableDate';

/**
 * Sombra
 * Carpa-sombrilla
 */
export class Shadow implements Prototype<Shadow>, Entity {
  private readonly _id: UUID;
  private readonly _identifier: StringObject;
  private readonly _season: UUID;
  private readonly _type: ShadowType;
  private readonly _coords: Coords;
  private _state: ShadowState;
  private _reservations: Reservation[] = [];
  private readonly _timestamp: Timestamps;
  private readonly _softDelete: SoftDelete;

  private constructor(
    id: UUID,
    season: UUID,
    identifier: StringObject,
    type: ShadowType,
    coords: Coords,
    timestamp: Timestamps,
    softDelete: SoftDelete,
  ) {
    this._id = id;
    this._season = season;
    this._identifier = identifier;
    this._state = new AvailableState(this);
    this._type = type;
    this._coords = coords;
    this._timestamp = timestamp;
    this._softDelete = softDelete;
  }

  getId(): UUID {
    return this._id;
  }

  getTimestamps(): Timestamps {
    return this._timestamp;
  }
  getSoftDelete(): SoftDelete {
    return this._softDelete;
  }

  delete(): void {
    this.state.delete();
  }
  update(): void {
    this.state.update();
  }

  static create(
    id: UUID,
    season: UUID,
    identifier: StringObject,
    type: ShadowType,
    coords: Coords,
    timestamp: Timestamps,
    softDelete: SoftDelete,
  ): Shadow {
    return new Shadow(
      id,
      season,
      identifier,
      type,
      coords,
      timestamp,
      softDelete,
    );
  }

  canBeReserved(dates: Booking): boolean {
    let isAvailable = true;
    if (this._softDelete.isDeleted) isAvailable = false;

    let overlap = false;
    this._reservations.forEach((reservation) => {
      if (reservation.booking.overlapsWith(dates)) {
        overlap = true;
      }
    });
    if (overlap) isAvailable = false;
    return isAvailable;
  }

  addReservation(reservation: Reservation) {
    const booking = reservation.booking;
    if (!this.canBeReserved(booking))
      throw new NotAvailableDate(
        booking.checkIn.toISOString(),
        booking.checkOut.toISOString(),
      );
    this._reservations.push(reservation);
    this._state = new BookedState(this);
  }
  isAvailable(): boolean {
    const date = new Date();
    date.setHours(date.getHours() + 8);
    return this.canBeReserved(Booking.create(new Date(), date));
  }

  get id(): UUID {
    return this._id;
  }

  get identifier(): StringObject {
    return this._identifier;
  }

  get type(): ShadowType {
    return this._type;
  }
  get coords(): Coords {
    return this._coords;
  }

  get timestamp(): Timestamps {
    return this._timestamp;
  }

  get softDelete(): SoftDelete {
    return this._softDelete;
  }
  get season() {
    return this._season;
  }
  get state(): ShadowState {
    return this._state;
  }

  get reservations(): Reservation[] {
    return this._reservations;
  }

  clone(): Shadow {
    return Shadow.create(
      UUID.create(),
      this._season,
      this._identifier,
      this._type,
      this._coords,
      Timestamps.create(),
      SoftDelete.empty(),
    );
  }
}

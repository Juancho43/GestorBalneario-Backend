import { Booking } from './Booking';
import { UUID } from '../../common/Model/UUID';
import { SoftDelete } from '../../common/Model/SoftDelete';
import { Timestamps } from '../../common/Model/Timestamps';
import { Entity } from '../../common/Model/Entity';

export class Reservation implements Entity {
  private readonly _id: UUID;
  private readonly _client: UUID;
  private readonly _shadow: UUID;
  private readonly _booking: Booking;
  private readonly _timestamp: Timestamps;
  private readonly _softDelete: SoftDelete;

  private constructor(
    id: UUID,
    client: UUID,
    shadow: UUID,
    booking: Booking,
    timestamp: Timestamps,
    softDelete: SoftDelete,
  ) {
    this._id = id;
    this._client = client;
    this._shadow = shadow;
    this._booking = booking;
    this._timestamp = timestamp;
    this._softDelete = softDelete;
  }

  delete(): void {
    this.softDelete.apply();
  }
  update(): void {
    this.timestamp.update();
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

  public static create(
    id: UUID,
    client: UUID,
    shadow: UUID,
    booking: Booking,
    timestamp: Timestamps,
    softdelete: SoftDelete,
  ): Reservation {
    if (!client || !shadow || !booking) {
      throw new Error('Invalid reservation data: All fields are required.');
    }
    return new Reservation(id, client, shadow, booking, timestamp, softdelete);
  }

  public getDurationInDays(): number {
    return this.booking.durationInDays();
  }

  get id(): UUID {
    return this._id;
  }
  get booking(): Booking {
    return this._booking;
  }
  get client(): UUID {
    return this._client;
  }
  get shadow(): UUID {
    return this._shadow;
  }
  get timestamp(): Timestamps {
    return this._timestamp;
  }
  get softDelete(): SoftDelete {
    return this._softDelete;
  }
}

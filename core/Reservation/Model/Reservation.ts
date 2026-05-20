import {Booking} from './Booking';
import {UUID} from '../../common/Model/UUID';
import {SoftDelete} from '../../common/Model/SoftDelete';
import {Timestamps} from '../../common/Model/Timestamps';
import {Entity} from '../../common/Model/Entity';
import {ReservationState} from "./ValueObjects/ReservationState";
import {CreatedState} from "./ValueObjects/CreatedState";
import {Client} from "../../Client/Model/Client";
import {Shadow} from "../../Shadow/Model/Shadow";

export class Reservation implements Entity {
  private readonly _id: UUID;
  private readonly _client: UUID;
  private readonly _shadow: UUID;
  private _booking: Booking;
  private _state: ReservationState;
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
    this._state = new CreatedState(this);
  }

  delete(): void {
    this._state.delete();

  }
  update(): void {
    this._state.update();
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
    return new Reservation(id, client, shadow, booking, timestamp, softdelete);
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
  clientCheckIn(client: Client){
    this._state.checkIn(client);
  }
  reschedule(shadow: Shadow, booking: Booking){
    this._state.reschedule(shadow,booking)
    this.booking = booking;
  }
  private set booking(booking: Booking) {
    this._booking = booking;
  }
  setState(state: ReservationState){
    this._state = state;
  }
}

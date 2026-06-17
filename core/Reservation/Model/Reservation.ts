import {Booking} from './Booking';
import {UUID} from '../../common/Model/UUID';
import {SoftDelete} from '../../common/Model/SoftDelete';
import {Timestamps} from '../../common/Model/Timestamps';
import {Entity} from '../../common/Model/Entity';
import {ReservationState} from "./States/ReservationState";
import {CreatedState} from "./States/CreatedState";
import {Client} from "../../Client/Model/Client";
import {Shadow} from "../../Shadow/Model/Shadow";
import {timestamp} from "rxjs";

export class Reservation implements Entity {
  private readonly _id: UUID;
  private readonly _client: UUID;
  private readonly _shadow: UUID;
  private _booking: Booking;
  private _checkIn: null | Date = null;
  private _checkOut: null | Date = null;
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

  clientCheckIn(client: Client, shadow: Shadow){
    this._state.checkIn(client,shadow);
  }
  clientCheckOut(client: Client){
    this._state.checkOut(client);
  }
  reschedule(shadow: Shadow, booking: Booking){
    this._state.reschedule(shadow,booking)
    this.booking = booking;
  }
  cancel(){
    this._state.cancel();
  }
  update(): void {
    this._state.update();
  }
  delete(): void {
    this._state.delete();
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
  get state(): ReservationState{
    return this._state;
  }
  setState(state: ReservationState){
    this._state = state;
  }
  private set booking(booking: Booking) {
    this._booking = booking;
  }

  get checkIn(): Date | null {
    return this._checkIn;
  }

  set checkIn(value: Date | null) {
    this._checkIn = value;
  }

  get checkOut(): Date | null {
    return this._checkOut;
  }

  set checkOut(value: Date | null) {
    this._checkOut = value;
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
}

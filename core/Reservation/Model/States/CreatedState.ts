import {ReservationState} from "./ReservationState";
import {Reservation} from "../Reservation";
import {Booking} from "../Booking";
import {Client} from "core/Client/Model/Client";
import {ActiveState} from "./ActiveState";
import {CancelledState} from "./CancelledState";
import {InvalidReservationActionError} from "../InvalidReservationActionError";
import {Shadow} from "core/Shadow/Model/Shadow";
import {NotAvailableDate} from "../../../Shadow/Model/NotAvailableDate";

export class CreatedState implements ReservationState {
 private readonly reservation: Reservation;

 constructor(reservation: Reservation) {
  this.reservation = reservation;
 }

 checkIn(client: Client,shadow: Shadow): void {

  if(this.reservation.client.value !== client.id.value){
   throw new Error('Client does not match the reservation');
  }
  if(this.reservation.shadow.value !== shadow.id.value){
   throw new Error('Shadow does not match the reservation');
  }
  if(!shadow.isAvailable(new Date())){
   throw new Error('Shadow is not available right now')
  }
  this.reservation.checkIn =  new Date();
  this.reservation.setState(new ActiveState(this.reservation));
  this.update();
 }

 checkOut(): void {
  throw new InvalidReservationActionError(this.toString(), 'finish');
 }

 reschedule(shadow: Shadow, booking: Booking): boolean {
  if (this.reservation.shadow.value !== shadow.id.value) {
   throw new Error('You can only reschedule to the same shadow');
  }
  if(shadow.canBeReserved(booking,this.getReservation().id)){
   this.update();
   return true;
  }else{
   throw new NotAvailableDate(booking.startDate.toISOString(),booking.endDate.toISOString());
  }
 }

 update(): void {
  this.reservation.timestamp.update();
 }

 delete(): void {
  this.reservation.softDelete.apply();
 }

 cancel(): void {
  this.reservation.setState(new CancelledState(this.reservation));
  this.update();
 }

 getReservation(): Reservation {
  return this.reservation;
 }
 toString(): string {
  return CreatedState.name;
 }
}
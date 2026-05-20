import {ReservationState} from "./ReservationState";
import {Reservation} from "../Reservation";
import {Booking} from "../Booking";
import { Client } from "core/Client/Model/Client";
import {ActiveState} from "./ActiveState";
import {CancelledState} from "./CancelledState";
import {InvalidReservationActionError} from "../InvalidReservationActionError";
import { Shadow } from "core/Shadow/Model/Shadow";

export class CreatedState implements ReservationState {
 private readonly reservation: Reservation;

 constructor(reservation: Reservation) {
  this.reservation = reservation;
 }

 reschedule(shadow: Shadow, booking: Booking): boolean {
  if (this.reservation.shadow.value !== shadow.id.value) {
   throw new Error('You can only reschedule to the same shadow');
  }
  if(shadow.canBeReserved(booking,this.getReservation().id)){
   this.update();
   return true;
  }else{
   throw new Error('The requested extension dates are not available.');
  }
 }

 checkIn(client: Client): void {

  if(this.reservation.client.value !== client.id.value){
   throw new Error('Client does not match the reservation');
  }
  this.reservation.setState(new ActiveState(this.reservation));
  this.update();
 }

 cancel(): void {
  this.reservation.setState(new CancelledState(this.reservation));
  this.update();
 }

 delete(): void {
  this.reservation.softDelete.apply();
 }

 finish(): void {
  throw new InvalidReservationActionError(this.toString(), 'finish');
 }

 update(): void {
  this.reservation.timestamp.update();
 }

 getReservation(): Reservation {
  return this.reservation;
 }
 toString(): string {
  return CreatedState.name;
 }
}
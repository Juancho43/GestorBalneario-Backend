import {Reservation} from "../../Model/Reservation";
import {ClientResponse} from "../../../Client/Application/DTO/ClientResponse";
import {ShadowResponse} from "../../../Shadow/Application/DTO/ShadowResponse";

export class ReservationResponse {
    static create(reservation: Reservation){
        return {
            id : reservation.id,
            client: ClientResponse.create(reservation.client),
            shadow: ShadowResponse.create(reservation.shadow),
            checkIn: reservation.booking.checkIn.toString(),
            checkOut: reservation.booking.checkOut.toString()
        }
    }
    static createList(reservations: Reservation[]){
        return reservations.map((reservation: Reservation) => {
            return this.create(reservation)
        })
    }
}
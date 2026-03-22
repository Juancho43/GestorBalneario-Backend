import { Reservation } from "../../Model/Reservation";
import { ClientResponse } from "../../../Client/Application/DTO/ClientResponse";
import { ShadowResponse } from "../../../Shadow/Application/DTO/ShadowResponse";

export class ReservationResponse {
    /** * Unique identifier for the reservation
     * @example "res_82910"
     */
    id: string;

    /** Associated client information */
    client: ClientResponse;

    /** Booking dates and schedule information */
    dates: {
        /** Check-in date and time (ISO 8601)
         * @example "2026-03-20T10:00:00Z"
         */
        checkIn: string;
        /** Check-out date and time (ISO 8601)
         * @example "2026-03-20T18:00:00Z"
         */
        checkOut: string;
    };
    /**
     * Total price for the reservation.
     * @example 1000
     * */
    price: number

    duration: number;


    state: string;

    shadow?: ShadowResponse;

    /**
     * Maps a Reservation Model to a ReservationResponse DTO
     */
    static create(reservation: Reservation): ReservationResponse {
        const r = new ReservationResponse();

        r.id = reservation.id.toString();
        r.dates = {
            checkIn: reservation.booking.checkIn.toString(),
            checkOut: reservation.booking.checkOut.toString(),
        };
        r.price = reservation.price;
        r.duration = reservation.booking.durationInDays();

        return r;
    }

    /**
     * Maps an array of Reservation Models to an array of ReservationResponse DTOs
     */
    static createList(reservations: Reservation[]): ReservationResponse[] {
        return reservations.map((reservation) => this.create(reservation));
    }
}
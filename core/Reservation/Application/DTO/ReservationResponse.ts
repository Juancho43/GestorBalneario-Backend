import {Reservation} from '../../Model/Reservation';
import {ShadowResponse} from '../../../Shadow/Application/Response/ShadowResponse';
import {TimeStampResponse} from '../../../common/Application/TimeStampResponse';
import {ClientResponse} from "../../../Client/Application/DTO/ClientResponse";

/**
 * Represents the response data for a reservation.
 * It extends TimeStampResponse to include creation and update timestamps.
 */
export class ReservationResponse extends TimeStampResponse {
  /**
   * Unique identifier for the reservation.
   * @example "res_82910"
   */
  id: string;

  /**
   * Booking dates and schedule information.
   * @example { checkIn: "2026-03-20T10:00:00Z", checkOut: "2026-03-20T18:00:00Z" }
   */
  dates: {
    /**
     * Check-in date and time (ISO 8601).
     * @example "2026-03-20T10:00:00Z"
     */
    checkIn: string;
    /**
     * Check-out date and time (ISO 8601).
     * @example "2026-03-20T18:00:00Z"
     */
    checkOut: string;
  };

  /**
   * The duration of the reservation in days.
   * @example 1
   */
  duration: number;
  price?:number;
  state:string;
  /**
   * Optional shadow information associated with the reservation.
   * @example { id: "shd_123", name: "Guest" }
   */
  shadow?: ShadowResponse;
  client?: ClientResponse;
  serviceId?: string;
  shadowId?:string;
  /**
   * Maps a Reservation Model to a ReservationResponse Interfaces.
   * @param {Reservation} reservation - The reservation model instance.
   * @returns {ReservationResponse} The reservation response Interfaces.
   */
  static create(reservation: Reservation): ReservationResponse {
    const r = new ReservationResponse();

    r.id = reservation.id.value;
    r.dates = {
      checkIn: reservation.booking.startDate.toString(),
      checkOut: reservation.booking.endDate.toString(),
    };
    r.duration = reservation.booking.durationInDays();

    return r;
  }

  /**
   * Maps an array of Reservation Models to an array of ReservationResponse DTOs.
   * @param {Reservation[]} reservations - An array of reservation model instances.
   * @returns {ReservationResponse[]} An array of reservation response DTOs.
   */
  static createList(reservations: Reservation[]): ReservationResponse[] {
    return reservations.map((reservation) => this.create(reservation));
  }
}

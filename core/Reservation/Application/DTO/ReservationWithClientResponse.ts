import { ReservationResponse } from './ReservationResponse';
import { ClientResponse } from '../../../Client/Application/DTO/ClientResponse';
import { Client } from '../../../Client/Model/Client';
import { Reservation } from '../../Model/Reservation';

/**
 * Represents a response that combines reservation data with client data.
 */
export class ReservationWithClientResponse {
  /**
   * The reservation data.
   * @example
   * {
   *   "id": "a9b6ec3a-12a4-4f8a-a7f0-4d3a3b1c5c6e",
   *   "people": 4,
   *   "date": "2024-08-15T18:30:00.000Z",
   *   "restaurantId": "b9c7ec4a-13a5-5f9a-b8f1-5d4a4b2c6d7f"
   * }
   */
  reservation: ReservationResponse;
  /**
   * The client data associated with the reservation.
   * @example
   * {
   *   "id": "c8d6ec2a-11a3-3e7a-a6e0-3c2a2b1b4b5d",
   *   "name": "Juancho",
   *   "email": "juancho@example.com"
   * }
   */
  client: ClientResponse;

  /**
   * Creates a new ReservationWithClientResponse instance.
   * @param data - An object containing the client and reservation models.
   * @returns A new ReservationWithClientResponse instance.
   */
  static create(data: { client: Client; reservation: Reservation }) {
    const response = new ReservationWithClientResponse();
    response.client = ClientResponse.create(data.client);
    response.reservation = ReservationResponse.create(data.reservation);
    return response;
  }

  /**
   * Creates a list of ReservationWithClientResponse instances.
   * @param data - An array of objects, each containing a client and reservation model.
   * @returns An array of ReservationWithClientResponse instances.
   */
  static createList(data: { client: Client; reservation: Reservation }[]) {
    return data.map((item) => ReservationWithClientResponse.create(item));
  }
}

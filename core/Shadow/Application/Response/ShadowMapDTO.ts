import {ShadowResponse} from "./ShadowResponse";
import {ReservationResponse} from "../../../Reservation/Application/DTO/ReservationResponse";
import {ClientResponse} from "../../../Client/Application/DTO/ClientResponse";

/**
 * Data transfer object for mapping shadows to reservations and clients.
 */
export class ShadowMapDTO {
    /**
     * An array of objects, each mapping a shadow to an optional reservation and an optional client.
     * @example
     * [
     *   {
     *     "shadow": {
     *       "id": "shadow-uuid-1",
     *       "date": "2024-01-01T12:00:00.000Z",
     *       "status": "active"
     *     },
     *     "reservation": {
     *       "id": "reservation-uuid-1",
     *       "details": "Reservation for table 4"
     *     },
     *     "client": {
     *       "id": "client-uuid-1",
     *       "name": "John Doe"
     *     }
     *   },
     *   {
     *     "shadow": {
     *       "id": "shadow-uuid-2",
     *       "date": "2024-01-02T18:00:00.000Z",
     *       "status": "inactive"
     *     }
     *   }
     * ]
     */
    map:{
        shadow: ShadowResponse;
        reservation?: ReservationResponse;
        client?: ClientResponse;
    }[]
}
export class CreateReservationCommand {
    /** * Id of the shadow
     * @example "shadow-123"
     */
    shadowId: string;

    /** * Id of the client
     * @example "client-88"
     */
    clientId: string;

    /**
     * Final price of the reservation
     * @example 150.00
     * */
    price: number;
    /**
     * Id of the reservationService
     * @example "service-456"
     * */
    serviceId: string;

    /** * Date and time of the client arrives
     * @example "2026-03-19T10:00:00Z"
     */
    checkIn: string;

    /** * Date and time of the client leaves
     * @example "2026-03-20T18:00:00Z"
     */
    checkOut: string;
}
/**
 * Represents a query to retrieve a reservation by its unique identifier.
 */
export class GetReservationQuery{
    /**
     * @param id The unique identifier of the reservation.
     * @example 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454'
     */
    constructor(public id:string) {
    }
}
/**
 * Represents a query to get a client by their ID.
 * @class
 */
export class GetClientQuery{
    constructor(
        /**
         * The unique identifier of the client.
         * @example 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
         */
        public id:string,
    ) {
    }
}
/**
 * Represents a query to retrieve a shadow by its unique identifier.
 */
export class GetShadowByIdQuery {
    /**
     * @param id The unique identifier of the shadow.
     * @example 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
     */
    constructor(
        public id: string,
    ) {
    }
}
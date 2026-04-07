/**
 * Represents a query to retrieve the details of a specific invoice.
 */
export class InvoiceDetailQuery {
    /**
     * @param id The unique identifier of the invoice.
     * @example 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
     */
    constructor(public id: string) {}
}
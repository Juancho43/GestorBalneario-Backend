import {ClientResponse} from "./ClientResponse";
import {InvoiceResponse} from "../../../Invoice/Application/DTO/InvoiceResponse";

/**
 * @class ClientDetailsDTO
 * @description Represents the detailed data of a client, including their invoices.
 */
export class ClientDetailsDTO{
    /**
     * The basic client information.
     * @example
     * {
     *   id: 'c4a8f3b0-5b8f-4b8f-8b8f-8b8f8b8f8b8f',
     *   name: 'John Doe',
     *   email: 'john.doe@example.com'
     * }
     */
    client: ClientResponse;
    /**
     * A list of invoices associated with the client.
     * @example
     * [
     *   {
     *     id: 'i4a8f3b0-5b8f-4b8f-8b8f-8b8f8b8f8b8f',
     *     amount: 100.50,
     *     date: '2023-10-27T10:00:00Z'
     *   }
     * ]
     */
    invoices: InvoiceResponse[] = [];
}